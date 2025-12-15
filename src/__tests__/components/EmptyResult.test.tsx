import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyResult from "../../components/EmptyResult";

describe("EmptyResult", () => {
    test("renders heading and description", () => {
        render(<EmptyResult onRetry={() => {}} onBack={() => {}} />);
        expect(screen.getByRole("heading", { name: /no recipe found/i })).toBeInTheDocument();
        expect(
            screen.getByText(/we couldn’t find a recipe that matches your preferences\./i)
        ).toBeInTheDocument();
    });

    test("renders action buttons", () => {
        render(<EmptyResult onRetry={() => {}} onBack={() => {}} />);
        expect(screen.getByRole("button", { name: /change criteria/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
    });

    test("calls callbacks when buttons are clicked", () => {
        const onRetry = jest.fn();
        const onBack = jest.fn();
        render(<EmptyResult onRetry={onRetry} onBack={onBack} />);

        fireEvent.click(screen.getByRole("button", { name: /change criteria/i }));
        fireEvent.click(screen.getByRole("button", { name: /try again/i }));

        expect(onBack).toHaveBeenCalledTimes(1);
        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});