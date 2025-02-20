USE [konecta_db]
GO
/****** Object:  Table [dbo].[empleados]    Script Date: 9/9/2024 20:08:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[empleados](
	[eid] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[fecha_ingreso] [date] NOT NULL,
	[salario] [decimal](18, 0) NOT NULL,
 CONSTRAINT [PK_empleados] PRIMARY KEY CLUSTERED 
(
	[eid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 9/9/2024 20:08:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[rid] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED 
(
	[rid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[solicitud]    Script Date: 9/9/2024 20:08:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[solicitud](
	[sid] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](50) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
	[resumen] [varchar](50) NOT NULL,
	[eid] [int] NOT NULL,
 CONSTRAINT [PK_solicitud] PRIMARY KEY CLUSTERED 
(
	[sid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 9/9/2024 20:08:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[uid] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](512) NOT NULL,
	[rid] [int] NOT NULL,
	[eid] [int] NOT NULL,
 CONSTRAINT [PK_usuarios] PRIMARY KEY CLUSTERED 
(
	[uid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[empleados] ON 

INSERT [dbo].[empleados] ([eid], [nombre], [fecha_ingreso], [salario]) VALUES (1, N'Administrador ', CAST(N'2024-09-01' AS Date), CAST(2000000 AS Decimal(18, 0)))
SET IDENTITY_INSERT [dbo].[empleados] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 

INSERT [dbo].[roles] ([rid], [nombre]) VALUES (1, N'Administrador')
INSERT [dbo].[roles] ([rid], [nombre]) VALUES (2, N'Empleado')
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[usuarios] ON 

INSERT [dbo].[usuarios] ([uid], [email], [username], [password], [rid], [eid]) VALUES (1, N'administrador@konecta.com', N'admin usuario', N'$2a$10$uy3p0TVa3UUYOzcj.W01BecZEwksxnVMEP6lzs7nlMs10vcn55XaO', 1, 1)
SET IDENTITY_INSERT [dbo].[usuarios] OFF
GO
ALTER TABLE [dbo].[solicitud]  WITH CHECK ADD  CONSTRAINT [FK_solicitud_empleados] FOREIGN KEY([eid])
REFERENCES [dbo].[empleados] ([eid])
GO
ALTER TABLE [dbo].[solicitud] CHECK CONSTRAINT [FK_solicitud_empleados]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK_usuarios_empleados] FOREIGN KEY([eid])
REFERENCES [dbo].[empleados] ([eid])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK_usuarios_empleados]
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD  CONSTRAINT [FK_usuarios_roles] FOREIGN KEY([rid])
REFERENCES [dbo].[roles] ([rid])
GO
ALTER TABLE [dbo].[usuarios] CHECK CONSTRAINT [FK_usuarios_roles]
GO
