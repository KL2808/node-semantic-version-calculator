export class Version {
  major: number;
  minor: number;
  fix: number;
  suffix: string | undefined = undefined;

  constructor(major: number = 0, minor: number = 0, fix: number = 0) {
    this.major = major;
    this.minor = minor;
    this.fix = fix;
  }

  getVersionString() {
    const versionString = `${this.major}.${this.minor}.${this.fix}${
      this.suffix ? `-${this.suffix}` : ""
    }`;
    return versionString;
  }
}
