import { render, screen } from "@testing-library/react";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import GridApp from ".";

const mainLayout: TemplatedGridProps = {
  areas: [
    ["title", "title"],
    ["settings", "plot"],
    ["footer", "footer"],
  ],
  rowSizes: ["100px", "350px", "30px"],
  colSizes: ["250px", "1fr"],
  gapSize: "1rem",
};
const testTitle = "My Test App Title";

const originalError = console.error;
beforeEach(() => {
  // Use a mock to clean up the console output
  console.error = jest.fn();
});
afterEach(() => {
  console.error = originalError;
});

describe("GridApp fills with proper elements", () => {
  test("Full basic app", () => {
    render(
      <GridApp
        layout={mainLayout}
        panels={{
          title: {
            uiName: "gridlayout::title_panel",
            uiArguments: { title: testTitle },
          },
          settings: {
            uiName: "shiny::sliderInput",
            uiArguments: { inputId: "mySlider", label: "My Slider!" },
          },
          plot: {
            uiName: "shiny::plotOutput",
            uiArguments: { outputId: "My Plot!" },
          },
        }}
      />
    );

    expect(
      screen.getByLabelText(/panel with shiny::plotOutput/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/panel with shiny::sliderInput/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/panel with gridlayout::title_panel/i)
    ).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  test("Empty app", () => {
    render(<GridApp layout={mainLayout} panels={{}} />);

    expect(
      screen.queryByLabelText(/panel with shiny::plotOutput/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/panel with shiny::sliderInput/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/panel with gridlayout::title_panel/i)
    ).not.toBeInTheDocument();
  });
});

describe("Errors properly", () => {
  test("Checks for proper matching of layout and requested elements", () => {
    expect(() =>
      render(
        <GridApp
          layout={mainLayout}
          panels={{
            appTitle: {
              uiName: "gridlayout::title_panel",
              uiArguments: { title: testTitle },
            },
          }}
        />
      )
    ).toThrowError(
      "Tried to place a panel onto an area not in the defined grid layout"
    );
  });
  test("Errors from individual ui components are not swallowed", () => {
    expect(() =>
      render(
        <GridApp
          layout={mainLayout}
          panels={{
            settings: {
              uiName: "shiny::sliderInput",
              uiArguments: {
                inputId: "mySlider",
                label: "My slider!",
                min: 100,
                max: 40,
                value: 50,
              },
            },
          }}
        />
      )
    ).toThrowError("Need to define a minimum value that is below the max");
  });
});
