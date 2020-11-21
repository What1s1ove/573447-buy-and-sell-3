import {cli} from './cli';

cli.version.run();
cli.help.run();
console.log(cli.generate.run());

console.log(`Hello, world!`);
