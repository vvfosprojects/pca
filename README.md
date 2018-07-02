Public Competition Application (PCA)

# Introduction

This application supports submission of applications for public competitions.

It is based on a backend developed in C# Asp.Net WebApi (.net framework 4.6.1) and a frontend developed in Angular6 with angular-material (frontendi gui) and    bootstrap4 (backoffice gui).

# Description

PCA is a software aimed at gathering applications for public competitions.

The software is designed not to require applicant strong authentication. Submitted applications are keyed by the applicant's Italian fiscal code. Fiscal code duplications are allowed by the software, since otherwise an applicant might be unable to submit when her/his fiscal code has been stolen by another fake applicant. It is up to the backoffice users to fix fiscal code duplications. On application submission, the applicant receives a PIN, which allows her/him to possibly update her/his application later on. In case the PIN gets lost, the applicant can submit new applications from scratch. Also in this case, a fiscal code duplication occurs and must be fixed.

Applications are never deleted. In case of application update, the old version is marked logically deleted.

All actions are logged, even fiscal code matches.

The software has been designed to tolerate an high load from the users and can store an ideally unlimited number of applications.

Real-time statistics on submitted application are available from the backoffice.

# Software Architecture

The software is composed of a backend (based on Asp.Net WebApi2), a frontend GUI (dedicated to applicants) and a backoffice GUI (dedicated to backoffice users). 

The frontend is based on Angular6 framework and Material Design. The backoffice is based on Angular6 framework and Bootstrap v4.

# Security

The system is compliant with security by-design and by-default enforced by GDPR regulation.

The backoffice GUI is protected through a token-based JWT authentication.

# Planned implementations

Implementation of a Denial of Service (DoS) reaction mechanism is planned (basically based on IP client identity). The reaction enforces a binary exponential backoff delay on every request coming from a DoS IP address.

# License

Source code is released under the terms of AGPL-3.0 license.

# Disclaimer

Use this project at your own risk. The authors are not responsible for any damage which might result from this project usage.