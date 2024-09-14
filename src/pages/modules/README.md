# Modules

### toolbar.js
Implements the navbar, which currently only contains the "RBlocks" title in the top left corner.

### workspace.js
Creates a BlocklyWorkspace with a number of configurations:
1. An inital XML structure is defined and referenced by initialXml. Note that in Blockly, XML is used to store the user's code and each block's location; so, when a user drag and drops a block, an XML block that is nested within the structure defined by initialXml is created and contains the block's type, all user inputs, and the block's location. For more on XML's role in Blockly, go here: https://rikwatson.github.io/blockly_xml_structure

2. The toolbox (the left pane) is defined with a number of categories ("General Functionality (using HELPrct)", "General Functionality", etc.) that each contain a number of blocks. The functionality of each block is defined in blockly/blocks.js; only the order in which the blocks are listed and which category they belong to are defined in workspace.js

3. The workspaceDidChange function handles the event that a change occurs in the workspace (the user is dragging a block around, the user places the block somewhere, the user deletes a block). When called, the function will convert the current blocks to code using Blockly's JavaScript code generator, encode the code as URI, concatenate it with an rdrr.io web address, and embed the concatenated URL in an iframe defined in compiler.js

### compiler.js
Defines an iframe that displays the rdrr.io compiler.