// Packages
import test from "test/mod.ts";

await test.find(/\S\.(test|tests)\.(js|ts)$/);
await test.run();