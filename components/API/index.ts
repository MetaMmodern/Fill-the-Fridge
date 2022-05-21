import baseAPI from "./baseApi";
import mockedAPI from "./mockedAPI";
import realAPI from "./realAPI";

const allApis: Record<typeof process.env.NODE_ENV, baseAPI> = {
  development: mockedAPI,
  production: realAPI,
  test: mockedAPI,
};

export default allApis[process.env.NODE_ENV];
