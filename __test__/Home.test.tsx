import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { AppRouterContextProviderMock } from "../test-utils/app-router-context-provider-mock";
import userEvent from "@testing-library/user-event";

const resolvedComponent = async (Component: any, props?: any) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};

describe("Testing Home page", () => {
  let HomeResolved = () => null as any;

  beforeEach(async () => {
    HomeResolved = await resolvedComponent(Home);
  });

  it("Auth text should be there", () => {
    const push = jest.fn;
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <HomeResolved />
      </AppRouterContextProviderMock>
    );
    const element = screen.getByText("Auth");
    expect(element).toBeInTheDocument();
  });

  it("Click on Signin", async () => {
    const router = { push: jest.fn(() => "/auth/login") };
    render(
      <AppRouterContextProviderMock router={router}>
        <HomeResolved />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByText("Sign in");
    fireEvent.click(button);
    expect(router.push).toHaveBeenCalledWith("/auth/login");
  });
});
