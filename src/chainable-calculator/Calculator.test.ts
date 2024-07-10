import { Calculator } from "./Calculator";

describe("Calculator", () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  it("should initialize with a given value", () => {
    calc = new Calculator(42);
    expect(calc.value).toBe(42);
  });

  it("should initialize with a default value of 0 if no value is given", () => {
    calc = new Calculator();
    expect(calc.value).toBe(0);
  });

  // Basic Operations
  it("should be able to add a number to the current value", () => {
    calc = new Calculator(42);
    calc.add(8);
    expect(calc.value).toBe(50);
  });

  it("should be able to subtract a number from the current value", () => {
    calc = new Calculator(32);
    calc.subtract(22);
    expect(calc.value).toBe(10);
  });

  it("should be able to multiply the current value by a number", () => {
    calc = new Calculator(5);
    calc.multiply(4);
    expect(calc.value).toBe(20);
  });

  it("should divide the current value by a number", () => {
    calc = new Calculator(100);
    calc.divide(10);
    expect(calc.value).toBe(10);
  });

  // Chained Operations
  it("should return itself for every arithmetic operation", () => {
    expect(calc.add(5)).toBe(calc);
    expect(calc.subtract(5)).toBe(calc);
    expect(calc.multiply(5)).toBe(calc);
    expect(calc.divide(5)).toBe(calc);
  });

  it("should perform a series of chained additions correctly", () => {
    expect(calc.add(5).add(10).add(15).value).toBe(30);
  });

  it("should perform a series of chained subtractions correctly", () => {
    expect(calc.subtract(5).subtract(10).subtract(15).value).toBe(-30);
  });

  it("should perform a series of mixed chained operations correctly", () => {
    expect(calc.add(5).subtract(10).multiply(2).divide(4).value).toBe(-2.5);
  });

  // Edge Cases
  it("should handle division by zero gracefully", () => {
    calc = new Calculator(10);
    calc.divide(0);
    expect(calc.value).toBe(Infinity);
  });

  it("should handle multiple divisions by zero gracefully", () => {
    calc = new Calculator(10);
    calc.divide(0).divide(0).divide(0);
    expect(calc.value).toBe(Infinity);
  });

  // Resetting
  it("should clear to 0", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).multiply(2).divide(4).clear();
    expect(calc.value).toBe(0);
  });

  it("should perform chained operations after resetting to the initial value", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).multiply(2).divide(4).clear();
    expect(calc.add(5).subtract(10).multiply(2).divide(2).value).toBe(-5);
  });

  // Undo/Redo
  it("should be able to undo the last operation", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).undo();
    expect(calc.value).toBe(105);
  });

  it("should be able to redo the last undone operation", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).undo().redo();
    expect(calc.value).toBe(95);
  });

  it("should be able to redo multiple undone operations", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).undo().undo().redo().redo();
    expect(calc.value).toBe(95);
  });

  it("should handle undoing when there are no operations to undo", () => {
    calc = new Calculator(100);
    calc.undo().undo().undo();
    expect(calc.value).toBe(100);
  });

  it("should handle redoing when there are no operations to redo", () => {
    calc = new Calculator(100);
    calc.redo().redo().redo();
    expect(calc.value).toBe(100);
  });

  it("should handle undoing after performing a new operation", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).undo().add(10).undo();
    expect(calc.value).toBe(105);
  });

  it("should handle redoing after performing a new operation", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).undo().add(10).redo();
    expect(calc.value).toBe(115);
  });

  it("should handle many undos", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).add(20).clear().add(20).divide(2);
    calc.undo().undo().undo().undo().undo();
    expect(calc.value).toBe(105);
  });

  it("should handle many redos", () => {
    calc = new Calculator(100);
    calc.add(5).subtract(10).add(20).clear().add(20).divide(2);
    calc.undo().undo().undo().undo().redo().redo().redo().redo();
    expect(calc.value).toBe(10);
  });
});
