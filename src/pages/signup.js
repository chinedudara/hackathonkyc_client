import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';
import { config } from '../util/config';

const apiUrl = config.apiUrl;
const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	icon: {
		Color: theme.palette.primary.main,
		width: 40,
		height: 40
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	},
	PasswordLen: {
		marginLeft: 7,
		padding: 2,
		color: '#BDBDBD'
	},
});

class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: [],
			loading: false,
			success: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const newUserData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		axios
			.post(apiUrl + '/signup', newUserData)
			.then((response) => {
				console.log(response.data)
				this.setState({ 
					loading: false,
					success: true
				});	
			})
			.catch((error) => {
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				{!this.state.success && <div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<OfflineBoltIcon className={classes.icon} />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<Typography>
						Create your hackathon account
					</Typography>
						
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="firstName"
									helperText={errors.firstName}
									error={errors.firstName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lastName"
									helperText={errors.lastName}
									error={errors.lastName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									autoComplete="username"
									helperText={errors.username}
									error={errors.username ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									helperText={errors.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									helperText={errors.password}
									error={errors.password ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
									onChange={this.handleChange}
								/>
							</Grid>
							<Typography variant="caption" className={classes.PasswordLen}>
								** At least 8 characters with letters, numbers & symbols
							</Typography>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
                            disabled={loading || 
                                !this.state.email || 
                                !this.state.password ||
                                !this.state.firstName || 
                                !this.state.lastName ||
                                !this.state.username }
						>
							Sign Up
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Divider/>
						<br/>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="login" variant="body2">
									Sign in instead?
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>}
				{this.state.success && 
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<OfflineBoltIcon className={classes.icon} />
					</Avatar>
					<Typography component="h1" variant="h5">
						Account Created
					</Typography>
					<Divider />
					<br/>
					<Typography noWrap>
						A verification link has been sent to {this.state.email}.
					</Typography>
					<Typography>
						Please verify your email address to continue.
					</Typography>
					<br/>
					<Typography>
						<Link href="/login" variant="body2">
							Back to login
						</Link>
					</Typography>
				</div>}
				
			</Container>
		);
	}
}

export default withStyles(styles)(signup);
