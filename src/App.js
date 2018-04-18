import React, { Component, createContext } from 'react'

const RoutingContext = createContext()

class Router extends Component {
  state = {
    location: window.location
  }

  push = to => {
    window.history.pushState(null, null, to)
    this.setState({ location: window.location })
  }

  popStateEvent = e => {
    this.setState({ location: e.target.location })
  }

  componentDidMount() {
    window.addEventListener('popstate', this.popStateEvent)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.popStateEvent)
  }

  render() {
    return (
      <RoutingContext.Provider
        value={{ location: this.state.location, push: this.push }}
        {...this.props}
      />
    )
  }
}

const Link = ({ to, ...anchorProps }) => {
  return (
    <RoutingContext.Consumer>
      {({ push }) => (
        <a
          href={to}
          {...anchorProps}
          onClick={e => {
            e.preventDefault()
            push(to)
          }}
        />
      )}
    </RoutingContext.Consumer>
  )
}

const Route = ({ path, component: Component }) => {
  return (
    <RoutingContext.Consumer>
      {({ location }) => {
        if (location.pathname === path) {
          return <Component />
        }

        return null
      }}
    </RoutingContext.Consumer>
  )
}

const About = () => <div>About page</div>
const Contact = () => <div>Contact page</div>
const Home = () => <div>Home page</div>

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h2>welcome to the website</h2>

          <ul>
            <li>
              <Link to="/about">about</Link>
            </li>

            <li>
              <Link to="/contact">contact</Link>
            </li>

            <li>
              <Link to="/">home</Link>
            </li>
          </ul>

          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/" component={Home} />
        </div>
      </Router>
    )
  }
}

export default App
