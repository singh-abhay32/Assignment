import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { datalog } from '../task-manager/db';

interface JwtPayload {
  id: Number
}

export default async (req: Request, res: Response, next: NextFunction) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith('Bearer') ||
		!req.headers.authorization.split(' ')[1]
	) {
		return res.status(422).json({
			message: "Please provide the token",
		});
	}
	const theToken = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(theToken, 'the-super-strong-secrect') as JwtPayload;
	datalog.query(
		`SELECT * FROM users WHERE id = ${decoded.id};`,
		(_err, users) => {
				if (!users.length) {
						return res.status(400).send({
								message: "User does not exist"
						});
				}
				datalog.query(
					`SELECT * FROM usertype WHERE id = ${users[0].usertypeid};`,
					(_err,usertypes) => {
							if (!usertypes.length) {
									return res.status(400).send({
											message: "User does not exist"
									});
							}
							switch (usertypes[0].name) {
								case 'SuperAdmin':
									next()
									break;
								case 'SubAdmin': {
									if (req.method !== 'DELETE') {
										next()
										break;
									} else {
										return res.status(400).send({
											message: "You are not authorized!"
										});
									}
								}
								case 'Student': {
									if (req.method === 'GET') {
										next()
										break;
									} else {
										return res.status(400).send({
											message: "You are not authorized!"
										});
									}
								}
							}
					})
		})
};