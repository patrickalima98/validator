/**
* Copyright (c) 2020 The Nuinalp and APO Softworks Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

import Validator from "./src/modules/validator.ts";
export default Validator;

// rules export
export { default as rules } 		from "./src/rules/index.ts";
export { setRule as setRule } 		from "./src/rules/index.ts";
export { setRules as setRules } 	from "./src/rules/index.ts";
export { clearRules as clearRules } from "./src/rules/index.ts";