import React from 'react';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

const NavBar = ({ login, fetchCategory }) => {
	return (
		<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
			<Container>
				<Link href="/" passHref>
					<Navbar.Brand className="d-flex align-items-center">
						<img
							className="rounded-circle mr-2"
							src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
							width={44}
							height={44}
							alt="logo"
						/>
						De4thZone
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto align-items-lg-center">
						<Nav.Item>
							<Link href="/" passHref>
								<Nav.Link>Home</Nav.Link>
							</Link>
						</Nav.Item>
						<Nav.Item>
							<Link href="/other" passHref>
								<Nav.Link>About</Nav.Link>
							</Link>
						</Nav.Item>
						<Dropdown as={NavItem}>
							<Dropdown.Toggle as={NavLink} id="dropdown-custom-1">
								Categories
							</Dropdown.Toggle>
							<Dropdown.Menu align="right">
								{fetchCategory.category.map((node) => (
									<Link href={`/categories/${node.id}/${node.slug}`} key={node.id} passHref>
										<Dropdown.Item eventKey={node.id}>{node.title}</Dropdown.Item>
									</Link>
								))}
							</Dropdown.Menu>
						</Dropdown>
						{login.isAuthenticated ? (
							<Dropdown as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-1" className="d-flex align-items-center">
									<img
										src={login.user.avatar}
										width={35}
										height={35}
										className="rounded-circle mr-1"
										alt={login.user.user_name}
									/>
									{login.user.user_name}
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<Dropdown.Item>Profile</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item>Logout</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						) : (
							<>
								<Nav.Item>
									<Link href="/register" passHref>
										<Nav.Link>Register</Nav.Link>
									</Link>
								</Nav.Item>
								<Nav.Item>
									<Link href="/login" passHref>
										<Nav.Link>Login</Nav.Link>
									</Link>
								</Nav.Item>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
