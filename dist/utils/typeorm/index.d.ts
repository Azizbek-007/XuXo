import { Referals } from "./entities/Referal";
import { Service } from "./entities/Service";
import { Users } from "./entities/User";
declare const entities: (typeof Referals | typeof Users | typeof Service)[];
export default entities;
export { Users, Referals, Service };
