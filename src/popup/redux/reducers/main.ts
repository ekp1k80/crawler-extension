import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pageConstants } from '../../navigator/constants';
import { ContentService } from '../../../content/contentService';
import { WSReactToContentScripts } from '../../../types/socketMessage';

// Define el tipo de estado
export interface MainSliceState {
  page: pageConstants;
  contentService: ContentService | undefined
  ws: WebSocket
}

const socket = new WebSocket('ws://localhost:3001');
    
socket.onopen = () => {
  console.log('Connected to the server from react');
  socket.send(JSON.stringify({ type: 'broadcast', data: { type: WSReactToContentScripts, data: {hi: 'hi from react'} }}))
};

socket.onmessage = (event) => {
  console.log(`Received from server in React: ${event.data}`);
};

socket.onclose = () => {
  console.log('Connection closed');
};

socket.onerror = (error) => {
    console.error(`WebSocket Error: ${error}`);
};

const initialState: MainSliceState = {
  page: pageConstants.customFormFilling, // Establece el valor inicial
  contentService: new ContentService(),
  // contentService: undefined,
  ws: socket,
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<pageConstants>) {
      state.page = action.payload;
    }
  }
});

export const { setPage } = mainSlice.actions;
export default mainSlice.reducer;
