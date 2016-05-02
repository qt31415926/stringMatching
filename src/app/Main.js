/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React, { Component }  from 'react';
import {deepOrange500, deepPurple500, purple50} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import StringEqualityPage from './StringEqualityPage';
import StringMatchingPage from './StringMatchingPage';
import ProofPage from './ProofPage';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
    accent1Color: purple50,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="container">
          <Paper>
            <Tabs>
              <Tab label="String Equality">
                <StringEqualityPage />
              </Tab>
              <Tab label="String Matching">
                <StringMatchingPage />
              </Tab>
              <Tab label="Proof">
                <ProofPage />
              </Tab>
            </Tabs>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
