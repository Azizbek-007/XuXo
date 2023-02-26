import { Paymets } from "./entities/Paymet";
import { Referals } from "./entities/Referal";
import { Service } from "./entities/Service";
import { Users } from "./entities/User";
declare const entities: (typeof Paymets | typeof Users | typeof Referals | typeof Service)[];
export default entities;
export { Users, Referals, Service, Paymets };
