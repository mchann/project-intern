import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Log from "@/models/Log";

import InternDashboard from "@/components/InternDashboard";
import MentorDashboard from "@/components/MentorDashboard";

export default async function DashboardPage(props: { searchParams: Promise<{ tab?: string; search?: string }> }) {
  // Pengecekan 
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as { role?: string; id?: string }; 
  const isMentor = currentUser?.role === "MENTOR";
  
  // Ambil URL Parameter
  const searchParams = await props.searchParams;
  const activeTab = searchParams.tab || (isMentor ? "laporan" : "isi-laporan");
  const searchQuery = searchParams.search || ""; 

  let interns: any[] = [];
  let logs: any[] = [];
  let internNames: string[] = []; 
  let myLogs: any[] = []; 

  await dbConnect(); 

  // Ambil Data sesuai Role
  if (isMentor) {
    let rawInterns = await User.find({ role: "INTERN" }).sort({ createdAt: -1 }).lean();
    let rawLogs = await Log.find().populate("user", "name").sort({ date: -1 }).lean(); 

    internNames = Array.from(new Set(rawInterns.map((i: any) => i.name))).filter(Boolean) as string[];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      interns = rawInterns.filter((intern: any) => intern.name?.toLowerCase() === query);
      logs = rawLogs.filter((log: any) => {
        const logName = log.name || log.user?.name || "";
        return logName.toLowerCase() === query;
      });
    } else {
      interns = rawInterns;
      logs = rawLogs;
    }
  } else {
    if (currentUser?.id) {
      myLogs = await Log.find({ user: currentUser.id }).sort({ date: -1 }).lean();
    }
  }

  if (!isMentor) {
    return <InternDashboard activeTab={activeTab} myLogs={myLogs} />;
  }

  return (
    <MentorDashboard 
      activeTab={activeTab} 
      searchQuery={searchQuery} 
      logs={logs} 
      internNames={internNames} 
      interns={interns} 
    />
  );
}