
console.log("Welcome to gitStarted!");

let program = require("commander");
let Command = require("./controllers/utility/command");

const _settings = {
    search:null,
    template:null,
    file:null
};

program
    .version("0.0.1")
    .usage("gitstarted [options]")
    .option("-i, install [template]", "Install template.", function(template) {
        _settings.template = template;
    })
    // .option("-h, help", "Show help.")
    .option("-s, search <list>", "Search templates.", function(search) {
        // return new Search(search.split(" "));
        _settings.search = search.split(" ");
    })
    .option("-f, file [file]", "Point at file.", function(file) {
        _store.file = file;
    });

program.parse(process.argv);
Command.checkSettings(_settings);


