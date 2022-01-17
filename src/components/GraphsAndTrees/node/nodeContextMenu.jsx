//TODO: AWAITS RIGHTCLICK IMPLEMENTATION ON NODE

import React, { useState } from 'react';
import { ChakraProvider, Box, Text, Container, Button } from '@chakra-ui/react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
const NodeContextMenuWrapper = (props) => {
  return (
    <div className="relative  z-50">
      <ContextMenuTrigger id="some_unique_identifier">
        <p className="text-white z-50"> Hi</p>
      </ContextMenuTrigger>

      <ContextMenu className="text-white" id="some_unique_identifier">
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 1</MenuItem>
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 2</MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }}>ContextMenu Item 3</MenuItem>
      </ContextMenu>
    </div>
  );
};

export default NodeContextMenuWrapper;
