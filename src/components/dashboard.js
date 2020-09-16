import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ForwardIcon from '@material-ui/icons/Forward';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Card, CardActions, CardContent, Button, Grid, Paper, TextField, 
    Avatar, IconButton, Link, Box, Collapse } from '@material-ui/core';

import clsx from 'clsx';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import { authMiddleWare } from '../util/auth';
import { grey } from '@material-ui/core/colors';
import { config } from '../util/config';

const apiUrl = config.apiUrl;
const styles = ((theme) => ({
	root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
        flexGrow: 1,
        padding: theme.spacing(1, 3, 2, 3),
    },
    content: {
        // flexGrow: 1,
        // padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
      paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: 230,
        width: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        flexDirection: "column",
        cursor: 'pointer',
        // flexWrap: 'wrap'
        // '&:hover, &:focus': {
        //   backgroundColor: emphasize(backgroundColor, 0.08),
        // }
      },
      paperDisabled: {
        backgroundColor: '#f6f6f6',
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        height: 230,
        width: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        flexDirection: "column",
        cursor: 'default',
      },
      headPaper: {
        backgroundColor: theme.palette.background.paper,
      },
      paper2: {
        backgroundColor: grey[80],
        padding: theme.spacing(2, 4, 3),
        height: 180,
        minWidth: 230,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: '1px dashed #BDBDBD',
        flexDirection: "column",
        cursor: 'pointer',
        marginBottom: 7
      },
      iconStyle: {
          height: 80,
          width: 80,
        //   color: '#757575',
          color: theme.palette.primary.main,
      },
      iconStyle2: {
          height: 50,
          width: 50,
          marginBottom: 7
      },
      iconStyleDisabled: {
          height: 80,
          width: 80,
          color: '#BDBDBD',
      },
      textStyle: {
        align: 'center',
        color: '#BDBDBD',
      },
      textStyleDisabled: {
        align: 'center',
        color: '#f6f6f6',
      },
      bvnModal:{
        maxWidth: 345,
        padding: '20px',
      },
	details: {
		display: 'flex'
	},
	avatar: {
		height: 90,
		width: 90,
		flexShrink: 0,
        flexGrow: 0,
	},
	locationText: {
		paddingLeft: '15px'
	},
	buttonProperty: {
		position: 'absolute',
		top: '50%'
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	progess: {
		position: 'absolute'
	},
	progess1: {
		position: 'absolute'
	},
	uploadButton: {
		// marginLeft: '8px',
		// margin: theme.spacing(1)
	},
	customError: {
		color: 'red',
		marginLeft: 5,
        padding: 15
	},
	customSuccess: {
		color: '#00b300',
        marginLeft: 10,
        padding: 15
	},
	submitButton: {
		marginTop: '10px'
    },
    avatarStyle: {
        padding: '40px'
    },
    headStyle: {
        padding: '20px'
    },
    avStyle: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    paperStyle: {
        padding: '30px',
    },
    input: {
      display: 'none',
    },
    checkBox:{
        position: 'relative',
        width: 30,
        height: 30,
        top: 1,
        left: 80,
        color: '#00b300',
    },
    pendingApproval:{
        position: 'relative',
        top: 1,
        left: 55,
        marginBottom: 2,
        color: '#00b300',
    },
	textHint: {
		marginLeft: 7,
		padding: 2,
		color: '#BDBDBD'
    },
    headDiv: {
        marginLeft: 30,
        padding: 5
    },
    headDetails: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10
    },
    tinyIcon: {
        width: 15,
        // height: 3,
        marginRight: 7
    },
    })
);

class dashboard extends Component {
    constructor(props) {
		super(props);

		this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            bvn: '',
            dob: '',
            passportMessage: '',
            passportSuccessMessage: '',
            utilitySuccessMessage: '',
            utilityMessage: '',
            disablePassport: false,
            disableUtility: false,
            uiLoading: true,
            buttonLoading: false,
            imageError: '',
            bvnModalOpen: false,
            documentModalOpen: false,
            bvnButtonLoading: false,
            otpButtonLoading: false,
            bvnMessage: '',
            showOTPModal: false,
            code: '',
            token: '',
            otpMessage: '',
            showAlert: false,
		};
    }
    
    ToggleBvnModal = () => {
        let modalState = this.state.bvnModalOpen
        this.setState({
            bvnModalOpen: !modalState,
            showOTPModal: false,
            bvnMessage: '',
            otpMessage: '',
            bvn: '',
            dob: ''
        })
    };
    
    ToggleOTPModal = () => {
        let modalState = this.state.showOTPModal
        this.setState({
            showOTPModal: !modalState,
            bvnModalOpen: false,
            otpMessage: '',
            code: '',
        })
    };
    
    ToggleDocumentModal = () => {
        let modalState = this.state.documentModalOpen
        this.setState({
            documentModalOpen: !modalState,
            bvnMessage: '',
            otpMessage: '',
            passportMessage: '',
            passportSuccessMessage: '',
            utilitySuccessMessage: '',
            utilityMessage: '',
            passport: '',
            utility: '',
            disableUtility: false,
            disablePassport: false
        })
    };

    toggleAlert = () => {
        const alertState = this.state.showAlert
        this.setState({
            showAlert: !alertState
        })
    };
    
    closeDocumentModalFinish = () => {
        let modalState = this.state.documentModalOpen
        this.setState({
            documentModalOpen: !modalState,
            bvnMessage: '',
            otpMessage: '',
            passportMessage: '',
            passportSuccessMessage: '',
            utilitySuccessMessage: '',
            utilityMessage: '',
            passport: '',
            utility: '',
            showAlert: true,
            disableUtility: false,
            disablePassport: false,
            pendingApproval: true,
        })
    };

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePassportChange = (event) => {
		this.setState({
            passport: event.target.files[0],
            passportMessage: '',
            passportSuccessMessage: '',
            utilitySuccessMessage: '',
            utilityMessage: '',
		});
	};

	handleUtilityChange = (event) => {
		this.setState({
            utility: event.target.files[0],
            passportMessage: '',
            passportSuccessMessage: '',
            utilitySuccessMessage: '',
            utilityMessage: '',
		});
    };
    
    handleMessageDisplay = (message, type) => {
        this.props.enqueueSnackbar(message, { variant: type });
    };

    capFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }

    handleUploadPassport = (event) => {
		event.preventDefault();
		this.setState({
			uiLoading: true
		});
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		let form_data = new FormData();
		form_data.append('passport', this.state.passport);
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post(apiUrl + '/user/passport', form_data, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then((response) => {
                console.log(response.data)
                this.setState({
					uiLoading: false,
                    passportSuccessMessage: response.data,
                    passport: '',
                    disablePassport: true
				}, () => {this.handleMessageDisplay(this.state.passportSuccessMessage.success, 'success')});
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					uiLoading: false,
					passportMessage: 'Oh snap!! Upload failed :('
				}, () => {this.handleMessageDisplay(this.state.passportMessage, 'error')});
			});
    };

    handleUploadUtility = (event) => {
		event.preventDefault();
		this.setState({
			uiLoading: true
		});
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		let form_data = new FormData();
		form_data.append('utility', this.state.utility);
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post(apiUrl + '/user/utility', form_data, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then((response) => {
                console.log(response.data)
                this.setState({
					uiLoading: false,
                    utilitySuccessMessage: response.data,
                    utility: '',
                    disableUtility: true
				}, () => {this.handleMessageDisplay(this.state.utilitySuccessMessage.success, 'success')});
                
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					uiLoading: false,
					utilityMessage: 'Oh snap!! Upload failed :('
				});
			}, () => {this.handleMessageDisplay(this.state.utilityMessage, 'error')});
    };

    componentDidMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get(apiUrl + '/user')
			.then((response) => {
                console.log(response.data);
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
                    username: response.data.userCredentials.username,
                    kycLevel: response.data.userCredentials.kycLevel,
					uiLoading: false
				}, () => {
                    if (this.state.kycLevel === 0){
                        this.handleMessageDisplay(`Welcome ${this.capFirstLetter(this.state.firstName)}. Start your verification`, 'success')
                    }
                    else{
                        this.handleMessageDisplay(`Welcome back ${this.capFirstLetter(this.state.firstName)}. Continue your verification`, 'default')
                    }
                });

                if ((response.data.userCredentials.documents.hasOwnProperty('passport') && 
                    response.data.userCredentials.documents.hasOwnProperty('utility')) && 
                    response.data.userCredentials.kycLevel < 2 && 
                    !response.data.userCredentials.documents.approved){
                        this.setState({
                            pendingApproval: true
                        })
                }
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving user data :(' }, () => {this.handleMessageDisplay(this.state.errorMsg, 'error')});
			});
	};

	handleBvnValidation = (event) => {
		event.preventDefault();
		this.setState({ 
            bvnButtonLoading: true, 
            bvnMessage: "",
        });
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
			bvn: this.state.bvn,
			dob: this.state.dob,
		};
		axios
			.post(apiUrl + '/verifybvn', formRequest)
			.then((response) => {
                console.log(response);
                this.setState({ 
                    bvnButtonLoading: false, 
                    bvnMessage: response.data
                }, () => {
                    if (this.state.bvnMessage.hasOwnProperty('error')){
                            this.handleMessageDisplay(this.state.bvnMessage.error, 'error')
                    }
                    if (this.state.bvnMessage.hasOwnProperty('success')){
                        this.handleMessageDisplay(this.state.bvnMessage.success, 'success')
                    }
                });
                if(response.data.hasOwnProperty('success') && response.data.hasOwnProperty('token')){
                        this.setState({ 
                        token: response.data.token,
                        retry: response.data.retry,
                        showOTPModal: true,
                        bvnModalOpen: false,
                        });
                }

			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				this.setState({
					bvnButtonLoading: false, 
                    bvnMessage: {error: error.response.message}
				}, () => {this.handleMessageDisplay(this.state.bvnMessage, 'error')});
			});
	};

	handleOTPCodeValidation = (event) => {
		event.preventDefault();
		this.setState({ 
            otpButtonLoading: true, 
            otpMessage: ''
        });
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
			code: this.state.code,
            token: this.state.token,
            bvn: this.state.bvn,
		};
		axios
			.post(apiUrl + '/validatecode', formRequest)
			.then((response) => {
                console.log(response);
                this.setState({ 
                    otpButtonLoading: false, 
                    otpMessage: response.data
                }, () => {
                    if (this.state.otpMessage.hasOwnProperty('error') && !this.state.otpMessage.canRetry){
                            this.handleMessageDisplay(this.state.otpMessage.error, 'error')
                    }
                    if (this.state.otpMessage.hasOwnProperty('error') && this.state.otpMessage.canRetry){
                            this.handleMessageDisplay(`${this.state.otpMessage.error}. Retry in ${this.state.retry}`, 'error')
                    }
                    if (this.state.otpMessage.hasOwnProperty('success')){
                        this.handleMessageDisplay(this.state.otpMessage.success, 'success')
                    }
                });
                if(response.data.hasOwnProperty('success')){
                        this.setState({ 
                            kycLevel: 1,
                            showOTPModal: false,
                            token: '',
                            code: ''
                        });
                }

			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				this.setState({
					otpButtonLoading: false, 
                    otpMessage: {error: error.response.message}
				}, () => {this.handleMessageDisplay(this.state.otpMessage, 'error')});
			});
    };
    
    auxOTPCheck = () => {
        this.setState({ 
            showOTPModal: true,
            bvnModalOpen: false,
            code: ''
        });
    }
    
    closeAllModal = () => {
        this.setState({ 
            showOTPModal: false,
            bvnModalOpen: false,
        });
    }
    
    render() {
		const { enqueueSnackbar, closeSnackbar, classes, ...rest } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
            <React.Fragment>
				<div className={classes.toolbar} />
                <div className={classes.root}>
                    <Collapse in={this.state.showAlert}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={this.toggleAlert}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                        <AlertTitle>Documents awaiting approval</AlertTitle>
                            You'll receive an email after your documents are reviewed to continue.
                        </Alert>
                    </Collapse>
				<main className={classes.content} lg="7">
					<div {...rest} className={clsx(classes.headPaper)}>
							<div className={clsx(classes.details, classes.headStyle)}>
                                        <center className={classes.avStyle}>
                                            <Avatar className={classes.avatar}>
                                                <Typography variant="h3">
                                                    <Box m={1}>
                                                        {this.state.firstName.charAt(0).toUpperCase()+this.state.lastName.charAt(0).toUpperCase()}
                                                    </Box>
                                                </Typography>
                                            </Avatar>
                                        </center>
                                <Grid container>
                                    <Grid item>
                                        <div>
                                            <Typography className={classes.locationText} gutterBottom variant="h6">
                                                {this.capFirstLetter(this.state.firstName)} {' '} {this.capFirstLetter(this.state.lastName)}
                                            </Typography>
                                            <Typography className={classes.headDetails} color="secondary">
                                                <AccountCircleOutlinedIcon className={classes.tinyIcon}/> {this.state.username}
                                            </Typography>
                                            <Typography className={classes.headDetails} color="secondary">
                                                <MailOutlineOutlinedIcon className={classes.tinyIcon}/> {this.state.email}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <div className={classes.headDiv}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                startIcon={<CloudUploadIcon />}
                                                className={classes.uploadButton}
                                                disabled
                                            >
                                                <Typography variant="caption" noWrap>
                                                KYC LV {this.state.kycLevel}
                                                </Typography>
                                                
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                
							</div>
							<div className={classes.progress} />
					</div>

					<br />
					<Card {...rest} className={clsx(classes.avatarStyle)}>
                            
							<CardContent>
                            <Typography variant="h6" >Verification</Typography>
                            <Typography color="textSecondary" gutterBottom>Complete the steps below to get verified</Typography><br/>
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} xs={12}>
                                        <Grid container justify="center" spacing={3}>
                                            <Grid item>
                                                <Paper 
                                                    className={this.state.kycLevel === 0 ? classes.paper : classes.paperDisabled} 
                                                    onClick={this.state.kycLevel === 0 ? this.ToggleBvnModal : null}
                                                    elevation={this.state.kycLevel === 0 ? 3 : 0}
                                                >
                                                            {this.state.kycLevel >= 1 && <CheckCircleIcon className={classes.checkBox} />}
                                                            <AccountBalanceOutlinedIcon className={this.state.kycLevel === 0 ? classes.iconStyle : classes.iconStyleDisabled}/>
                                                            <Typography color={this.state.kycLevel === 0 ? "textSecondary" : "secondary"} variant="h6">Level 1</Typography>
                                                            <Typography color={this.state.kycLevel === 0 ? "textSecondary" : "secondary"}>BVN Verification</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper 
                                                    className={this.state.kycLevel === 1 ? classes.paper : classes.paperDisabled} 
                                                    onClick={this.state.kycLevel === 1 ? this.ToggleDocumentModal : null}
                                                    elevation={this.state.kycLevel === 1 ? 3 : 0}
                                                >
                                                            {this.state.kycLevel >= 2 && <CheckCircleIcon className={classes.checkBox} />}
                                                            {this.state.pendingApproval && this.state.kycLevel !== 2 && <Typography component="div" className={classes.pendingApproval}>
                                                                                                                            <Box fontStyle="oblique" m={1}>
                                                                                                                                Awaiting...
                                                                                                                            </Box>
                                                                                                                        </Typography>}
                                                            <AccountBoxOutlinedIcon className={this.state.kycLevel === 1 ? classes.iconStyle : classes.iconStyleDisabled}/>
                                                            <Typography color={this.state.kycLevel === 1 ? "textSecondary" : "secondary"} variant="h6">Level 2</Typography>
                                                            <Typography color={this.state.kycLevel === 1 ? "textSecondary" : "secondary"}>Passport Verification</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item>
                                                <Paper 
                                                    className={this.state.kycLevel === 2 ? classes.paper : classes.paperDisabled}
                                                    elevation={this.state.kycLevel === 2 ? 3 : 0}
                                                >
                                                            {this.state.kycLevel === 3 && <CheckCircleIcon className={classes.checkBox} />}
                                                            <AccountTreeOutlinedIcon className={this.state.kycLevel === 2 ? classes.iconStyle : classes.iconStyleDisabled}/>
                                                            <Typography color={this.state.kycLevel === 2 ? "textSecondary" : "secondary"} variant="h6">Level 3</Typography>
                                                            <Typography color={this.state.kycLevel === 2 ? "textSecondary" : "secondary"}>Link Bank Account</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
							</CardContent>
							<CardActions>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                className={classes.submitButton}
                                onClick={
                                    this.state.kycLevel === 0 ? this.ToggleBvnModal
                                    : this.state.kycLevel === 1 ? this.ToggleDocumentModal
                                    : null
                                }
                                disabled={this.state.buttonLoading}
                            >
                                {this.state.kycLevel === 0 ? 'Start Verification' : 'Continue Verification'}
                                {this.state.buttonLoading && <CircularProgress size={30} className={classes.progess} />}
                            </Button>
                            </CardActions>
					</Card>
					
                    <Dialog onClose={this.closeAllModal} aria-labelledby="simple-dialog-title" scroll="body" open={this.state.bvnModalOpen ? this.state.bvnModalOpen : this.state.showOTPModal}>
                    {this.state.bvnModalOpen && <Card className={clsx(classes.paperStyle)}>
                            <Typography classes={classes.textStyle} variant="h6" >
                                    BVN Verification 
                                    {this.state.token && <Link href="#" onClick={this.auxOTPCheck} variant="body2">
                                        {' | '}Received an OTP which is still valid?
                                    </Link>}
                                </Typography>
                                <form autoComplete="off" noValidate>
                                    <CardContent>
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Bank Verification Number"
                                                    margin="dense"
                                                    name="bvn"
                                                    variant="outlined"
                                                    value={this.state.bvn}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Date of birth"
                                                    margin="dense"
                                                    name="dob"
                                                    variant="outlined"
                                                    value={this.state.dob}
                                                    onChange={this.handleChange}
                                                />
                                                <Typography variant="caption" className={classes.textHint}>
                                                    ** Date of birth must be in format DD-MM-YYYY
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    
                                    <CardActions>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            className={classes.submitButton}
                                            onClick={this.handleBvnValidation}
                                            disabled={
                                                !this.state.bvn ||
                                                !this.state.dob || 
                                                this.state.bvnButtonLoading
                                            }
                                        >
                                            Verify
                                            {this.state.bvnButtonLoading && <CircularProgress size={30} className={classes.progess1} />}
                                        </Button>
                                    </CardActions>
                                </form>
                            </Card>}
                            {this.state.showOTPModal && <Card className={clsx(classes.paperStyle)}>
                                <Typography classes={classes.textStyle} variant="h6" >Confirm OTP</Typography>
                                <form autoComplete="off" noValidate>
                                    <CardContent>
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="OTP code"
                                                    margin="dense"
                                                    name="code"
                                                    variant="outlined"
                                                    value={this.state.code}
                                                    onChange={this.handleChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            className={classes.submitButton}
                                            onClick={this.handleOTPCodeValidation}
                                            disabled={
                                                !this.state.code || 
                                                this.state.otpButtonLoading
                                            }
                                        >
                                            Submit & Continue
                                            {this.state.otpButtonLoading && <CircularProgress size={30} className={classes.progess} />}
                                        </Button>
                                    </CardActions>
                                </form>
                            </Card>}
                    </Dialog>

                    <Dialog onClose={this.ToggleDocumentModal} scroll="body" aria-labelledby="simple-dialog-title" open={this.state.documentModalOpen}>
                        <Card className={clsx(classes.paperStyle)}>
                        <CardContent>
                                <Typography variant="h6" >Passport Verification</Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Upload passport AND Proof of Address to continue
                                    <Typography variant="caption" color="textSecondary" gutterBottom>
                                        {'   *JPG & PNG only'}
                                    </Typography>
                                    </Typography>
                                    <br/>
                                        <Grid container direction="row" spacing={6}>
                                            <Grid item xs={12} sm={6}>
                                            <input accept="image/*" className={classes.input} onChange={this.handlePassportChange} id="passport" type="file" disabled={this.state.disablePassport} />
                                                <label htmlFor="passport">
                                                    <box className={classes.paper2} width="auto">
                                                            <AssignmentIndOutlinedIcon color={this.state.disablePassport ? "secondary" : "primary"} className={classes.iconStyle2}/>
                                                        <Typography noWrap variant="button" color={this.state.disablePassport ? "secondary" : "textSecondary"}>
                                                            Select Passport
                                                        </Typography>
                                                        <Typography noWrap variant="caption" color="textSecondary">
                                                            {this.state.passport ? `${this.state.passport.name.substring(0, 20)}...` : ' '}
                                                        </Typography>
                                                    </box>
                                                </label>
                                                
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    type="submit"
                                                    size="small"
                                                    startIcon={<CloudUploadIcon />}
                                                    className={classes.uploadButton}
                                                    onClick={this.handleUploadPassport}
                                                    disabled={
                                                        !this.state.passport
                                                    }
                                                    nowrap
                                                    fullWidth
                                                >
                                                    Upload Passport
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={6} >
                                                <input accept="image/*" className={classes.input} onChange={this.handleUtilityChange} id="utility" type="file" disabled={this.state.disableUtility}/>
                                                <label htmlFor="utility">
                                                    <box className={classes.paper2} width="auto">
                                                            <DescriptionOutlinedIcon color={this.state.disableUtility ? "secondary" : "primary"} className={classes.iconStyle2}/>
                                                        <Typography noWrap variant="button" color={this.state.disableUtility ? "secondary" : "textSecondary"}>
                                                            Select Utility Bill
                                                        </Typography>
                                                        <Typography noWrap variant="caption" color="textSecondary">
                                                            {this.state.utility ? `${this.state.utility.name.substring(0, 20)}...` : ' '}
                                                        </Typography>
                                                    </box>
                                                </label>
                                                
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    type="submit"
                                                    size="small"
                                                    startIcon={<CloudUploadIcon />}
                                                    className={classes.uploadButton}
                                                    onClick={this.handleUploadUtility}
                                                    disabled={
                                                        !this.state.utility
                                                    }
                                                    nowrap
                                                    fullWidth
                                                >
                                                    Upload Utility Bill
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            startIcon={<ForwardIcon />}
                                            className={classes.uploadButton}
                                            onClick={this.closeDocumentModalFinish}
                                            disabled={
                                                !(this.state.disablePassport && this.state.disableUtility)
                                            }
                                        >
                                            Continue
                                            {this.state.buttonLoading && <CircularProgress size={30} className={classes.progess} />}
                                        </Button>
                                    </CardActions>
                            </Card>
                    </Dialog>
                    
				</main>
                </div>
                </React.Fragment>
			);
		}
    }
}

export default (withStyles(styles)(withSnackbar(dashboard)));

