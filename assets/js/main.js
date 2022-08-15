$(function () {
    // HACK: This should be window.Terminal once upgraded to 4.0.1
    var term = new Terminal({ rows: 50, cols: 140 });
    term.open(document.getElementById('terminal-container'));
    commandMap.initialize(term);


    window.clear = function() {
      term.clear();
    }

    window.print = function(string) {
        term.write(string);
    };

    window.println = function(string) {
        term.writeln(COLORS.RESET + string + COLORS.RESET);
    };

    function rtrim(str) {
        if(!str) return str;
        return str.replace(/\s+$/g, '');
      }

    function processCommand(command) {
        command = rtrim(command);
        args = command.split(' ');
        name = args[0];
        args.shift();

        term.write('\n\r');
        if(commandMap.has(name)) {
            commandMap.execute(name, args);
        } else {
            println('Unknown command.');
        }
    }
  
    function runTerminal() {
      if (term._initialized) {
        return;
      }
  
      term._initialized = true;
  
      term.prompt = () => {
        term.write('\r\n$ ');
      };
  
      term.writeln('Welcome to my personal portfolio website! Explore if you dare!');
      term.writeln('This is a terminal where you can explore my projects and information about me.');
      term.writeln('If you just want to see a normal page, type `exit` into the terminal.');
      term.writeln('');
      
      commandMap.execute('help', []);
      prompt(term);
      
      term.onData(e => {
        switch (e) {
          case '\r': // Enter
            currentInput = term.buffer.active.getLine(term.buffer.active.cursorY).translateToString(false, 2);
            processCommand(currentInput);
          case '\u0003': // Ctrl+C
            prompt(term);
            break;
          case '\u007F': // Backspace (DEL)
            // Do not delete the prompt
            if (term._core.buffer.x > 2) {
              term.write('\b \b');
            }
            break;
          default: // Print all other characters
            term.write(e);
        }
      });
    }
  
    function prompt(term) {
      term.write('\r\n$ ');
    }
    runTerminal();
  });