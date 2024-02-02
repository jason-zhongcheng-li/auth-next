import { auth } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return <div>Settings Page, session is {JSON.stringify(session)}</div>;
};

export default SettingsPage;
