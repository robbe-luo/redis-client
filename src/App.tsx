import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { ColorModeContext } from './context/color-mode-context';
import { electronAPI } from './electron';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div>
          <Button onClick={() => electronAPI.setTitle('new title')}>
            切换title
          </Button>
          <Button onClick={() => electronAPI.openFile()}>open file</Button>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
