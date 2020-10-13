import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Finished from "./pages/Finished";
import Config from "./pages/Config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { finishedList, todoList } from "./stores";

const { Content } = Layout;

function App(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/">
              <Todo todoList={todoList.list} />
            </Route>
            <Route path="/finished">
              <Finished finishedList={finishedList.list} />
            </Route>
            <Route path="/config">
              <Config />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
