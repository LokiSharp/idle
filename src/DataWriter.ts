export class DataWriter {
  public data: number[] = [];

  public addNumber(value: number): void {
    this.data.push(value);
  }

  public addBool(value: boolean): void {
    this.data.push(value ? 1 : 0);
  }

  public addChunk(data: number[]): void {
    this.data = this.data.concat(data);
  }

  public addVariableLengthChunk(data: number[]): void {
    this.data.push(data.length);
    this.addChunk(data);
  }

  public addBoolArray(data: boolean[]): void {
    this.data.push(data.length);
    this.addChunk(data.map((val) => (val ? 1 : 0)));
  }

  public addString(str: string): void {
    this.addNumber(str.length);
    for (let i = 0; i < str.length; i++) {
      this.addNumber(str.charCodeAt(i));
    }
  }
}
