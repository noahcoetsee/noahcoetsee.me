class Command {
    constructor(name, description, executor, usage = name) {
        this.name = name;
        this.description = description;
        this.executor = executor;
        this.usage = usage;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getUsage() {
        return this.usage;
    }

    execute(args) {
        this.executor(args);
    }

    terminal(terminal) {
        this.terminal = terminal;
    }
}

class CommandMap {
    constructor(commands) {
        this.commands = commands != undefined ? commands : new Map();
        this.hiddenCommands = new Map();
        this.terminal = null;
    }

    initialize(terminal) {
        this.terminal = terminal;
        for (let command of this.commands.values()) {
            command.terminal(terminal);
        }
    }

    register(name, command, hidden = false) {
        if(!hidden) {
            this.commands.set(name, command);
        } else {
            this.hiddenCommands.set(name, command);
        }
    }

    unregister(name) {
        this.commands.remove(name);
        this.hiddenCommands.remove(name);
    }

    has(name) {
        name = name.trim().toLowerCase();
        return this.commands.has(name) || this.hiddenCommands.has(name);
    }

    get(name) {
        name = name.trim().toLowerCase();
        if (this.commands.has(name)) {
            return this.commands.get(name);
        } else {
            return this.hiddenCommands.get(name);
        }
    }

    execute(name, args) {
        name = name.trim().toLowerCase();
        return this.get(name).execute(args);
    }

    getCommands() {
        return this.commands.values();
    }
}

commandMap = new CommandMap();


helpCommand = new Command("help", "Get help.", (args) => {
    if (args.length == 0) {
        println(COLORS.BRIGHT_WHITE + 'Available Commands: ');
        for (command of commandMap.getCommands()) {
            println(COLORS.WHITE + command.getName() + COLORS.BRIGHT_BLACK + ' | ' + COLORS.BLUE + command.getDescription());
        }
        return;
    }

    if (args.length == 1) {
        command = commandMap.get(args[0].toLowerCase());
        println(COLORS.WHITE + `${command.getName()} Usage:`);
        println(COLORS.WHITE + '  | ' + COLORS.CYAN + `${command.getUsage()}`)
    }
}, 'help [command]');
commandMap.register('help', helpCommand);

aboutCommand = new Command("about", "Learn about me!", (args) => {
    if (args.length == 0 || args[0].toLowerCase() == 'me') {
        println(COLORS.BRIGHT_BLUE + "My name is Noah, and I've been working with computers and programming since around 2013-2014 (4th grade for me).");
        println(COLORS.BRIGHT_BLUE + "I began with HTML, CSS, and JS, but I now have extensive knowledge of Python, Java, C++, JavaScript/TypeScript, and many others!");
        println(COLORS.BRIGHT_BLUE + "I have lots of experience with web design and fullstack web development, server management, backend development, and Minecraft (lol).");
        println(COLORS.BRIGHT_BLUE + "\nCheck out some of my projects with the `projects` and `project` command!");
        return;
    }

    if (args.length == 1 && args[0].toLowerCase() == 'mentor') {
        println(COLORS.BRIGHT_BLUE + "Barry Lindler has been my mentor since I began high school in 2018; he is an amazing man who knows how to bring out the");
        println(COLORS.BRIGHT_BLUE + "best in people. He has shaped me into who I am today, and has most certainly done so to many others. He is ");
        println(COLORS.BRIGHT_BLUE + "the best teachers I have ever met, and probably ever will meet. Follow the man on Twitter: @barrylindler");
    }
}, 'about [me/mentor]');
commandMap.register('about', aboutCommand);

projects = JSON.parse(`{
    "projects": {
        "FeaturedSpace": {
            "version": "2.0.3",
            "started": "August, 2019",
            "completed": "Ongoing",
            "website": "featuredspace.com",
            "github": "None",
            "description": [
                "FeaturedSpace is a Minecraft Network project that I started in 2019, after coining the name: 'FeaturedSpace'.",
                "Minecraft is the game that initially got me into programming, and still to this day I enjoy working with it!",
                "The FeaturedSpace Network is meant to be more than just a Minecraft Network. It is a connected network of",
                "various different 3rd party servers for different games such as Minecraft, Rust, Terraria, CS:GO, and more.",
                "",
                "The main feature of FeaturedSpace is its unique gamemodes that are created to be genuine experiences rather than",
                "small minigames that are pay-to-win (which was a big problem in the Minecraft 3rd-party community).",
                "",
                "Unfortunately, due to it being a proprietary project, the source code is not available, however you can check out",
                "the network at its website: https://featuredspace.com"
            ]
        },
        "pyDraw": {
            "version": "1.2.0",
            "started": "December, 2020",
            "completed": "Ongoing",
            "website": "pydraw.graphics",
            "github": "https://github.com/pydraw/pydraw",
            "description": [
                "pyDraw is a graphics library for Python, designed to help students learn to program easily with Python.",
                "The main idea behind it was the poor design of Python's default 'turtle' module. It was simple not up to",
                "the standards I would set for a program designed to teach real programming. It was difficult to use to create",
                "interactive programs or programs of great magnitude.",
                "",
                "pyDraw solves this with its object-oriented interface, making it easy to interact with shapes and objects, along",
                "with adding an automated input-system, allowing input methods to be created and registered with zero hassle.",
                "It also introduced easy modification as all classes are well documented and there is a standard way to define",
                "new types of Polygons."
            ]
        },
        "javaDraw": {
            "version": "1.0.0",
            "started": "February, 2021",
            "completed": "Ongoing",
            "website": "javadraw.graphics",
            "github": "https://github.com/javadraw/javadraw",
            "description": [
                "javaDraw is the sister library to pyDraw (\`project pydraw\`), and was designed to be a very similar interface.",
                "It allows for students to quickly and effectively learn Java Programming with graphics; with as little hassle as possible",
                "The base for javaDraw was CoffeeDraw, an unfinished project I made in 2018-2019 based on ObjectDraw (a graphics library).",
                "I designed CoffeeDraw as a fork of ObjectDraw and then later converted it to be used as javaDraw!",
                "",
                "javaDraw features easy input (As simple as extending \`Window\` and defining methods), object-oriented polygons, and",
                "easy-to-use algorithms such as .contains() and .overlaps(), allowing for true interactive programs/games to be easily designed."
            ]
        }
    }
}`).projects;

function printProject(name, project) {
    println(COLORS.CYAN + `Project: ` + COLORS.WHITE + `${name}`);
    println(COLORS.CYAN + `Version: ` + COLORS.WHITE + `${project.version}`);
    println(COLORS.CYAN + `Started: ` + COLORS.WHITE + `${project.started}`);
    println(COLORS.CYAN + `Completed: ` + COLORS.WHITE + `${project.completed}`);
    println(COLORS.CYAN + `Website: ` + COLORS.WHITE + `${project.website}`);
    println(COLORS.CYAN + `Github: ` + COLORS.WHITE + `${project.github}`);
    println("");
    println(COLORS.CYAN + `Description: `);
    for(line in project.description) {
        println(COLORS.WHITE + project.description[line]);
    }
}

projectCommand = new Command('project', 'Learn about one of my projects!', (args) => {
    if(args.length == 0) {
        println(this.getUsage());
        return;
    }

    projectName = args[0];
    for (const key in projects) {
        if(key.toLowerCase() == projectName.toLowerCase())
            printProject(key, projects[key]);
    }
}, "project <[project]/list>");
commandMap.register('project', projectCommand);

projectsCommand = new Command("projects", 'View all of my projects!', (args) => {
    println(COLORS.CYAN + "Projects: ");
    for(let key in projects) {
        println(`  - ${key}`);
    }
}, "projects");
commandMap.register("projects", projectsCommand);

clearCommand = new Command('clear', 'Clear the console', (args) => {
    clear();
    setTimeout(clear, 1);
}, 'clear');
commandMap.register('clear', clearCommand);


const contact = {
    email: 'noah@noahcoetsee.me',
    github: 'https://github.com/noahcoetsee',
    linkedin: 'https://linkedin.com/in/noahcoetsee',
    discord: '@FeaturedSpace#0001',
    twitter: '@noahcoetsee',
};

contactCommand = new Command('contact', 'Contact me!', (args) => {
    if(args.length == 0) {
        println(COLORS.CYAN + "Contact Information: ");
        for(const key in contact) {
            println(COLORS.WHITE + `${key.charAt(0).toUpperCase() + key.slice(1)}: ` + COLORS.GREEN + `${contact[key]}`);
        }
    } else {
        if (contact.hasOwnProperty(args[0].toLowerCase())) {
            key = args[0].toLowerCase();
            println(COLORS.CYAN + `${key.charAt(0).toUpperCase() + key.slice(1)} ` + COLORS.WHITE + ` ${contact[args[0].toLowerCase()]}`);
        } else {
            println(COLORS.RED + "That contact type does not exist. Run `contact` to see all options.");
        }
    }
}, 'contact [type]');
commandMap.register('contact', contactCommand);

barryCommand = new Command('barry', 'Secret command, huh?', (args) => {
    let seed = Math.round(Math.random() * 5);
    switch(seed) {
        case 0:
            println(COLORS.BRIGHT_RED + "VARY BARRY!");
            break;
        case 1:
            println(COLORS.BRIGHT_RED + "Happy Birthday!");
            break;
        case 2:
            println(COLORS.BRIGHT_RED + "Just like my face!");
            break;
        case 3:
            println(COLORS.BRIGHT_RED + "I let my mom out to walk every once in a while; her cage isn't the most roomy.");
            break;
        case 4:
            println(COLORS.BRIGHT_RED + "Karen is my secret middle name.");
            break;
        case 5:
            println(COLORS.BRIGHT_RED + "My face is amazing.");
            break;
    }
}, 'vary ?');
commandMap.register('barry', barryCommand, true);