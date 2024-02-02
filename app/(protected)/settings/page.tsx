import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/routes";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      Settings Page, session is {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          console.log("calling sign out");
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
