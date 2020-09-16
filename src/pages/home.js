import React, { Component } from 'react';
import axios from 'axios';

import Account from '../components/account';
import Dashboard from '../components/dashboard';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { SnackbarProvider } from 'notistack';

import { authMiddleWare } from '../util/auth'
import { config } from '../util/config';

const apiUrl = config.apiUrl;
const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar,
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
	icon: {
		backgroundColor: theme.palette.primary.main,
		width: 40,
		height: 40
	},
});

class home extends Component {
	state = {
		render: false
	};

	loadAccountPage = (event) => {
		this.setState({ render: true });
	};

	loadDashboardPage = (event) => {
		this.setState({ render: false });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		// localStorage.removeItem('requestId');
		this.setState({
            anchorEl: null
        })
		this.props.history.push('/login');
	};

	handleChange = (event) => {
		this.setState({ auth: event.target.checked });
	  };
	
	handleMenu = (event) => {
		this.setState({ 
			anchorEl: event.currentTarget 
		});
	  };
	
	handleClose = () => {
		this.setState({
            anchorEl: null
        })
	  };

	constructor(props) {
		super(props);

		this.state = {
			uiLoading: true,
			auth: true,
			anchorEl: null,
		};
	}

	componentDidMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get(apiUrl + '/user')
			.then((response) => {
				this.setState({
					uiLoading: false,
				});
			})
			.catch((error) => {
				if(error.response.status === 403) {
					this.props.history.push('/login')
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

	render() {
		const open = Boolean(this.state.anchorEl);
		const { classes } = this.props;		
		if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position="fixed" className={classes.appBar} elevation={2}>
						<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<OfflineBoltIcon className={classes.icon} />
						</IconButton>
						<Typography variant="h6" className={classes.title} noWrap>
							Hackathon KYC
						</Typography>
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={this.state.anchorEl}
								anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								open={open}
								onClose={this.handleClose}
							>
								<MenuItem  onClick={this.logoutHandler}>
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
							</div>
						</Toolbar>
					</AppBar>
					<Drawer
						className={classes.drawer}
						variant="permanent"
						classes={{
							paper: classes.drawerPaper
						}}
					>
						<div className={classes.toolbar} />
						<List>
							<ListItem button key="Dashboard" onClick={this.loadDashboardPage}>
								<ListItemIcon>
									{' '}
									<DashboardIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Dashboard" />
							</ListItem>

							<ListItem button key="Account" onClick={this.loadAccountPage}>
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>
						</List>
					</Drawer>

					<div>{this.state.render ? <Account /> : <SnackbarProvider maxSnack={3}><Dashboard /></SnackbarProvider>}</div>
				</div>
			);
		}
	}
}

export default withStyles(styles)(home);
