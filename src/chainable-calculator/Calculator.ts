export class Calculator {
  // Instance State
  public value: number;

  // Class State
  private static factorialCache: { [key: number]: number } = {};
  private undoStack: number[] = [];
  private redoStack: number[] = [];

  constructor(value?: number) {
    this.value = value || 0;
  }

  // TODO break this apart
  private withUndoRedo<T extends any[]>(
    operation: (...args: T) => void
  ): (...args: T) => Calculator {
    return (...args: T): Calculator => {
      this.undoStack.push(this.value);
      this.redoStack = [];
      operation.apply(this, args);
      return this;
    };
  }

  public undo = () => {
    if (this.undoStack.length === 0) {
      return this;
    }
    this.redoStack.push(this.value);
    this.value = this.undoStack.pop()!;
    return this;
  };

  public redo = () => {
    if (this.redoStack.length === 0) {
      return this;
    }
    this.undoStack.push(this.value);
    this.value = this.redoStack.pop()!;
    return this;
  };

  public add = this.withUndoRedo((num: number) => {
    this.value += num;
  });

  public subtract = this.withUndoRedo((num: number) => {
    this.value -= num;
  });

  public multiply = this.withUndoRedo((num: number) => {
    this.value *= num;
  });

  public divide = this.withUndoRedo((num: number) => {
    this.value /= num;
  });

  public pow = this.withUndoRedo((num: number) => {
    this.value = Math.pow(this.value, num);
  });

  public sqrt = this.withUndoRedo(() => {
    this.value = Math.sqrt(this.value);
    return this;
  });

  public cos = this.withUndoRedo(() => {
    this.value = Math.cos(this.value);
  });

  public sin = this.withUndoRedo(() => {
    this.value = Math.sin(this.value);
  });

  public tan = this.withUndoRedo(() => {
    this.value = Math.tan(this.value);
  });

  public clear = this.withUndoRedo(() => {
    this.value = 0;
  });

  public factorial = this.withUndoRedo(() => {
    if (Calculator.factorialCache[this.value] !== undefined) {
      this.value = Calculator.factorialCache[this.value];
    } else {
      let result = 1;
      for (let i = 1; i <= this.value; i++) {
        result *= i;
      }
      Calculator.factorialCache[this.value] = result;
      this.value = result;
    }
  });
}
