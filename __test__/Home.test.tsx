import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { useRouter } from "next/navigation";
import { AppRouterContextProviderMock } from "./app-router-context-provider-mock";

const resolvedComponent = async (Component: any, props?: any) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

describe("Testing Home page", () => {
  it("Auth text should be there", async () => {
    const HomeResolved = await resolvedComponent(Home);
    const push = jest.fn;
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <HomeResolved />
      </AppRouterContextProviderMock>
    );
    const element = screen.getByText("Auth");
    await waitFor(() => expect(element).toBeInTheDocument());
  });
});
