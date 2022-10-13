export class DataReader {
  private data: number[];
  private dataIndex: number;

  public constructor(data: number[]) {
    this.data = data;
    this.dataIndex = 0;
  }

  public get dataLength(): number {
    return this.data.length;
  }

  public get atEnd(): boolean {
    return this.dataLength === this.dataIndex;
  }

  public getBool(): boolean {
    return this.nextValue() === 1;
  }

  public getNumber(): number {
    let value = this.nextValue();
    if (value === undefined) value = Infinity;
    return value;
  }

  public nextValue(): number {
    const value = this.data[this.dataIndex];
    this.dataIndex++;
    return value;
  }

  public getChunk(length: number): number[] {
    const chunk = this.data.slice(this.dataIndex, this.dataIndex + length);
    this.dataIndex += length;
    return chunk;
  }

  public getString(): string {
    const strLength = this.getNumber();
    return String.fromCharCode(...this.getChunk(strLength));
  }

  public getRawData(): number[] {
    return this.data;
  }
}
