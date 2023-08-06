import * as React from 'react';
import { Navbar, Modal } from 'react-bootstrap';
import appRoutes from '../../routes/routes';

console.log(sessionStorage.getItem('username'));
interface HeaderProps {
}

interface HeaderState {
    sidebarExists: boolean;
    modalShow: boolean;
}

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false,
            modalShow: false
        };
    }

    // tslint:disable-next-line no-any
    mobileSidebarToggle(e: any) {
        if (this.state.sidebarExists === false) {
            this.setState({
                sidebarExists: true
            });

        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        const node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function () {
            this.parentElement!.removeChild(this);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }

    getBrand() {

        const routeIndex = appRoutes.findIndex(r => window.location.pathname.indexOf(r.path) !== -1);
        const appRoute = appRoutes[routeIndex];

        if (appRoute && appRoute.name) {
            return appRoute.name;
        }
        return 'Stockmarket Simulation';
    }

    render() {

        const render = () => {

            return (
                <Navbar fluid={true} >
                    <Navbar.Header style={{'width' : '100%'}}>
                        <Navbar.Brand>
                            <a href="#">{this.getBrand()}</a>
                        </Navbar.Brand>
                        <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                        
                        <p className="username" style={{'float' : 'right', 'margin': '5px 0px', 'padding': '15px 15px', 'fontSize': '20px'}}>
                            {sessionStorage.getItem('username')}
                        </p>

                        <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />

                    </Navbar.Header>
                </Navbar>
            );
        };
        return render();
    }
}