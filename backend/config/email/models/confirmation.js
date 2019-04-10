
const confirmation = (action, email) => {
	var template = `<!DOCTYPE html>
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
			xmlns:v="urn:schemas-microsoft-com:vml">

		<head>
			<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
			<meta content="width=device-width" name="viewport" />
			<meta content="IE=edge" http-equiv="X-UA-Compatible" />
			<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
			<style type="text/css">
				body {
					margin: 0;
					padding: 0;
				}

				table,
				td,
				tr {
					vertical-align: top;
					border-collapse: collapse;
				}

				* {
					line-height: inherit;
				}

				a[x-apple-data-detectors=true] {
					color: inherit !important;
					text-decoration: none !important;
				}

				[owa] .img-container div,
				[owa] .img-container button {
					display: block !important;
				}

				[owa] .fullwidth button {
					width: 100% !important;
				}

				[owa] .block-grid .col {
					display: table-cell;
					float: none !important;
					vertical-align: top;
				}
			</style>
			<style id="media-query" type="text/css">
				@media only screen and (min-width: 620px) {
					.block-grid {
						width: 600px !important;
					}

					.block-grid .col {
						vertical-align: top;
					}

					.block-grid .col.num12 {
						width: 600px !important;
					}

					.block-grid.mixed-two-up .col.num3 {
						width: 150px !important;
					}

					.block-grid.mixed-two-up .col.num4 {
						width: 200px !important;
					}

					.block-grid.mixed-two-up .col.num8 {
						width: 400px !important;
					}

					.block-grid.mixed-two-up .col.num9 {
						width: 450px !important;
					}

					.block-grid.two-up .col {
						width: 300px !important;
					}

					.block-grid.three-up .col {
						width: 200px !important;
					}

					.block-grid.four-up .col {
						width: 150px !important;
					}

					.block-grid.five-up .col {
						width: 120px !important;
					}

					.block-grid.six-up .col {
						width: 100px !important;
					}

					.block-grid.seven-up .col {
						width: 85px !important;
					}

					.block-grid.eight-up .col {
						width: 75px !important;
					}

					.block-grid.nine-up .col {
						width: 66px !important;
					}

					.block-grid.ten-up .col {
						width: 60px !important;
					}

					.block-grid.eleven-up .col {
						width: 54px !important;
					}

					.block-grid.twelve-up .col {
						width: 50px !important;
					}
				}

				@media (max-width: 620px) {

					.block-grid,
					.col {
						min-width: 320px !important;
						max-width: 100% !important;
						display: block !important;
					}

					.block-grid {
						width: 100% !important;
					}

					.col {
						width: 100% !important;
					}

					.col>div {
						margin: 0 auto;
					}

					img.fullwidth,
					img.fullwidthOnMobile {
						max-width: 100% !important;
					}

					.no-stack .col {
						min-width: 0 !important;
						display: table-cell !important;
					}

					.no-stack.two-up .col {
						width: 50% !important;
					}

					.no-stack .col.num4 {
						width: 33% !important;
					}

					.no-stack .col.num8 {
						width: 66% !important;
					}

					.no-stack .col.num4 {
						width: 33% !important;
					}

					.no-stack .col.num3 {
						width: 25% !important;
					}

					.no-stack .col.num6 {
						width: 50% !important;
					}

					.no-stack .col.num9 {
						width: 75% !important;
					}

					.mobile_hide {
						min-height: 0px;
						max-height: 0px;
						max-width: 0px;
						display: none;
						overflow: hidden;
						font-size: 0px;
					}
				}
			</style>
		</head>

		<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #B8CCE2;">
			<style id="media-query-bodytag" type="text/css">
				@media (max-width: 620px) {
					.block-grid {
						min-width: 320px !important;
						max-width: 100% !important;
						width: 100% !important;
						display: block !important;
					}

					.col {
						min-width: 320px !important;
						max-width: 100% !important;
						width: 100% !important;
						display: block !important;
					}

					.col>div {
						margin: 0 auto;
					}

					img.fullwidth {
						max-width: 100% !important;
						height: auto !important;
					}

					img.fullwidthOnMobile {
						max-width: 100% !important;
						height: auto !important;
					}

					.no-stack .col {
						min-width: 0 !important;
						display: table-cell !important;
					}

					.no-stack.two-up .col {
						width: 50% !important;
					}

					.no-stack.mixed-two-up .col.num4 {
						width: 33% !important;
					}

					.no-stack.mixed-two-up .col.num8 {
						width: 66% !important;
					}

					.no-stack.three-up .col.num4 {
						width: 33% !important
					}

					.no-stack.four-up .col.num3 {
						width: 25% !important
					}
				}
			</style>
			<table bgcolor="#B8CCE2" cellpadding="0" cellspacing="0" class="nl-container"
				style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #B8CCE2; width: 100%;"
				valign="top" width="100%">
				<tbody>
					<tr style="vertical-align: top;" valign="top">
						<td style="word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">
							<div style="background-color:transparent;">
								<div class="block-grid"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
									<div
										style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">

										<div class="col num12"
											style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
													<div class="mobile_hide">
														<table border="0" cellpadding="0" cellspacing="0" class="divider"
															style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
															valign="top" width="100%">
															<tbody>
																<tr style="vertical-align: top;" valign="top">
																	<td class="divider_inner"
																		style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; border-collapse: collapse;"
																		valign="top">
																		<table align="center" border="0" cellpadding="0"
																			cellspacing="0" class="divider_content" height="40"
																			style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 40px;"
																			valign="top" width="100%">
																			<tbody>
																				<tr style="vertical-align: top;" valign="top">
																					<td height="40"
																						style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;"
																						valign="top"><span></span></td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="background-color:transparent;">
								<div class="block-grid"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #053766;;">
									<div style="border-collapse: collapse;display: table;width: 100%;background-color:#053766;">
										<div class="col num12"
											style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 20px;">
													<div align="center" class="img-container center fixedwidth"
														style="padding-right: 10px;padding-left: 10px;">
														<div style="font-size:1px;line-height:10px"> </div><img align="center"
															alt="Image" border="0" class="center fixedwidth"
															src="https://firebasestorage.googleapis.com/v0/b/caduser-a8b76.appspot.com/o/helpMyTime-logo.png?alt=media&token=3a7bdaac-683e-453e-8853-07b770a5caaf"
															style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 145px; display: block;"
															title="Image" width="145" />
														<div style="font-size:1px;line-height:10px"> </div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="background-color:transparent;">
								<div class="block-grid"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;;">
									<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
										<div class="col num12"
											style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:35px; padding-bottom:0px; padding-right: 35px; padding-left: 35px;">
													<div
														style="color:#132F40;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
														<div
															style="font-size: 12px; line-height: 14px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #132F40;">
															<p style="font-size: 14px; line-height: 24px; margin: 0;"><span
																	style="font-size: 20px;">Você está a um passo de aproveitar
																	todas as facilidades!</span></p>
														</div>
													</div>
													<div
														style="color:#555555;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:150%;padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
														<p
															style="font-size: 12px; line-height: 21px; text-align: justify; color: #555555; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0;">
															<span style="font-size: 14px;">Para que você possa desfrutar de um
																serviço de agendamento excelente precisamos manter a plataforma
																segura e reduzir qualquer tipo de spam por meio de usuários
																mal-intencionados. Por isso precisamos que confirme seu email
																clicando no botão ativar minha conta.</span></p>
													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="background-color:transparent;">
								<div class="block-grid mixed-two-up"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;;">
									<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
										<div class="col num4"
											style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 200px;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
													<div align="left" class="img-container left fixedwidth"
														style="padding-right: 0px;padding-left: 10px;">
														<img
															alt="Image" border="0" class="left fixedwidth"
															src="https://firebasestorage.googleapis.com/v0/b/caduser-a8b76.appspot.com/o/agendamento.gif?alt=media&token=154f523e-f056-441a-99c4-30c848c3b7f8"
															style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; border: 0; height: auto; float: none; width: 100%; max-width: 190px; display: block;"
															title="Image" width="190" />
													</div>
												</div>
											</div>
										</div>
										<div class="col num8"
											style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 400px;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
													<div
														style="color:#132F40;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
														<p
															style="font-size: 12px; line-height: 14px; color: #132F40; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; margin: 0;">
															<strong><span style="font-size: 14px; line-height: 16px;">E lá se
																	vão maravilhosas dicas para organizar a sua
																	agenda:</span></strong></p>
													</div>
													<div
														style="color:#555555;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
														<p
															style="font-size: 12px; line-height: 16px; text-align: justify; color: #555555; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0;">
															<span style="font-size: 14px;">Ao finalizar as tarefas do dia,
																dedique uns minutinhos extras à organização da sua agenda para o
																dia seguinte. </span><span
																style="font-size: 14px; line-height: 16px;"></span><span
																style="font-size: 14px; line-height: 16px;">A aprenda a mensurar
																o tempo necessário para realizar cada tarefa, preencha a agenda
																de maneira que nenhuma dessas tarefas vai ocupar você mais do
																que o necessário.</span></p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/271/bg_password.gif');background-position:top center;background-repeat:no-repeat;background-color:transparent;">
								<div class="block-grid no-stack"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
									<div
										style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
										<div class="col num12"
											style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:2px; padding-right: 35px; padding-left: 35px;">
													<div
														style="color:#555555;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:120%;padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:10px;">
														<p
															style="font-size: 12px; line-height: 14px; color: #555555; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0;">
															Para  <strong>ATIVAR A SUA CONTA</strong></p>
														<p
															style="font-size: 12px; line-height: 14px; color: #555555; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; margin: 0;">
															e poder utilizar nossos serviços, clique no botão abaixo.</p>
													</div>
													<div align="left" class="button-container"
														style="padding-top:5px;padding-right:10px;padding-bottom:35px;padding-left:10px;">
														<form id="form-id" action="http://`+action+`" method="POST">
														<input type="hidden" name="email" value="`+ email +`"/>
														<button style="text-decoration:none;display:inline-block;color:#132F40;background-color:#FFD500;border-radius:50px;-webkit-border-radius:50px;-moz-border-radius:50px;width:auto; width:auto;;border-top:1px solid #FFD500;border-right:1px solid #FFD500;border-bottom:1px solid #FFD500;border-left:1px solid #FFD500;padding-top:5px;padding-bottom:5px;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span
																style="padding-left:20px;padding-right:20px;font-size:15px;display:inline-block;">
																<span style="font-size: 16px; line-height: 32px;"><span
																		style="font-size: 15px; line-height: 30px;"><strong><span
																				style="line-height: 30px; font-size: 15px;">ATIVAR
																				MINHA CONTA &gt;</span></strong></span></span>
															</span></div>
														</button>
												</div></a>
											</div></a>
										</div></a>
									</div>
								</div>
							</div>
							</div>
							<div style="background-color:transparent;">
								<div class="block-grid two-up no-stack"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #132f40;;">
									<div style="border-collapse: collapse;display: table;width: 100%;background-color:#132f40;">
										<div class="col num6"
											style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 25px;">
													<div
														style="color:#F8F8F8;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
														<div
															style="font-size: 12px; line-height: 14px; color: #F8F8F8; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;">
															<p style="font-size: 14px; line-height: 16px; margin: 0;">
																<strong>HelpMyTime</strong></p>
															<p style="font-size: 14px; line-height: 16px; margin: 0;">
																Agendamento de serviços online</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col num6"
											style="max-width: 320px; min-width: 300px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
													<table cellpadding="0" cellspacing="0" class="social_icons"
														style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
														valign="top" width="100%">
														<tbody>
															<tr style="vertical-align: top;" valign="top">
																<td style="word-break: break-word; vertical-align: top; padding-top: 20px; padding-right: 35px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;"
																	valign="top">
																	<table activate="activate" align="right"
																		alignment="alignment" cellpadding="0" cellspacing="0"
																		class="social_table"
																		style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;"
																		to="to" valign="top">
																		<tbody>
																			<tr align="right"
																				style="vertical-align: top; display: inline-block; text-align: right;"
																				valign="top">
																				<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 10px; border-collapse: collapse;"
																					valign="top"><a
																						href="https://www.facebook.com/"
																						target="_blank" title="Facebook"><img
																							alt="Facebook" height="32"
																							src="images/facebook@2x.png"
																							style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
																							title="Facebook" width="32" /></a>
																				</td>
																				<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 10px; border-collapse: collapse;"
																					valign="top"><a href="https://twitter.com/"
																						target="_blank" title="Twitter"><img
																							alt="Twitter" height="32"
																							src="images/twitter@2x.png"
																							style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
																							title="Twitter" width="32" /></a>
																				</td>
																				<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 0px; padding-left: 10px; border-collapse: collapse;"
																					valign="top"><a
																						href="https://instagram.com/"
																						target="_blank" title="Instagram"><img
																							alt="Instagram" height="32"
																							src="images/instagram@2x.png"
																							style="outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; clear: both; height: auto; float: none; border: none; display: block;"
																							title="Instagram" width="32" /></a>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="background-color:transparent;">
								<div class="block-grid"
									style="Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
									<div
										style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
										<div class="col num12"
											style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;">
											<div style="width:100% !important;">
												<div
													style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
													<table border="0" cellpadding="0" cellspacing="0" class="divider"
														style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
														valign="top" width="100%">
														<tbody>
															<tr style="vertical-align: top;" valign="top">
																<td class="divider_inner"
																	style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px; border-collapse: collapse;"
																	valign="top">
																	<table align="center" border="0" cellpadding="0"
																		cellspacing="0" class="divider_content" height="30"
																		style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 0px solid transparent; height: 30px;"
																		valign="top" width="100%">
																		<tbody>
																			<tr style="vertical-align: top;" valign="top">
																				<td height="30"
																					style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;"
																					valign="top"><span></span></td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</body>
		</html>`;

	return(template);
}

module.exports = confirmation;
