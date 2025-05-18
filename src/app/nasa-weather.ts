export interface AtmosphericTemperature {
  av: number;
  ct: number;
  mn: number;
  mx: number;
}

export interface SolData {
  AT?: AtmosphericTemperature;
  First_UTC: string;
  Last_UTC: string;
  Season: string;
}

export interface NasaWeather {
  sol_keys: string[];
  [sol: string]: SolData | string[];
}
