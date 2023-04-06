const teamSchema = require('../models/team.model');
const memberSchema = require("../models/members.model");
const jwt = require('jsonwebtoken');
const cloudinary = require('../utilis/cloudinary');

const sequelize = require('sequelize');
const { Op } = require('sequelize');

exports.insertTeam = async (req, res) => {
    try {

        const uploadedProfileImageDetails = await cloudinary.uploader.upload(req.file.path, { folder: "teamProfile" });

        const teamData = new teamSchema({

            teamprofile: uploadedProfileImageDetails.secure_url,
            publicurlid: uploadedProfileImageDetails.public_id,
            teamname: req.body.teamname,

        })
        const data = await teamData.save();

        res.status(200).json({
            message: "TEAM REGISTRATION SUCCESSFULLY",
            status: 200,
            data: data
        })
        console.log("========{ Insert Team }========");

    } catch (error) {
        console.log("insertData-Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};

exports.updateTeam = async (req, res) => {
    try {

        console.log("req.file:__", req.file);
        const updateData = await teamSchema.findOne({ where: { id: req.params.id } })
            .then(record => {

                if (!record) {
                    res.status(404).json({
                        message: "TEAM DATA NOT FOUND",
                        status: 404,
                    })
                } else {

                    if (record.teamprofile != '') {
                        console.log("record.teamprofile", record);
                        cloudinary.uploader.destroy(record.publicurlid);
                    }

                    cloudinary.uploader.upload(req.file.path, { folder: "teamProfile" })
                        .then(urlData => {
                            console.log("=urlData", urlData);
                            let values = {
                                teamprofile: urlData.url,
                                publicurlid: urlData.public_id,
                                teamname: req.body.teamname,
                            }

                            record.update(values).then(updatedRecord => {

                                res.status(200).json({
                                    message: "UPDATE DATA SUCCESSFULLY",
                                    status: 200,
                                    data: updatedRecord,
                                })
                                console.log("========{ update Team }========");
                                // this compo hitted it means data was updated check DB and confirm update
                            })
                        })
                }

            })
            .catch((error) => {
                // do seomthing with the error (print erropr)
                console.log("error:__", error);
                res.status(500).json({
                    message: "SOMETHING WENT WRONG (inside query para.)",
                    status: 500,
                    error: error,
                })
            })

    } catch (error) {

        console.log("updateData-error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.viewAllTeamList = async (req, res) => {
    try {
        const allTeamList = await teamSchema.findAll();


        res.status(200).json({
            message: "ALL TEAM LIST",
            status: 200,
            data: allTeamList
        })


    } catch (error) {
        console.log("stateInPeople:___", error);
        res.status(500).json({
            message: 'SOMETHING WENT WRONG',
            status: 500,
        })
    }
}

exports.deleteTeam = async (req, res) => {
    try {

        const findTeamDetails = await teamSchema.findOne({ where: { id: req.params.id } });
        // console.log('findTeamDetails:__', findTeamDetails);

        if (findTeamDetails == null) {

            res.status(404).json({
                message: "TEAM NOT FOUND",
                status: 404,
            })

        } else {
            cloudinary.uploader.destroy(findTeamDetails.publicurlid);

            const deleteTeamDetails = await teamSchema.destroy({ where: { id: req.params.id } });
            // console.log('deleteTeamDetails:__', deleteTeamDetails);
            if (deleteTeamDetails.length == 0) {

                res.status(404).json({
                    message: "TEAM NOT FOUND",
                    status: 404,
                })

            } else {

                res.status(200).json({
                    message: "TEAM DELETED",
                    status: 200,
                })
            }

        }

    } catch (error) {
        console.log("deleteTeam:___", error);
        res.status(500).json({
            message: 'SOMETHING WENT WRONG ( deleteTeam )',
            status: 500,
        })
    }
}

exports.teamById = async (req, res) => {
    try {
        const TeamList = await teamSchema.findOne({ where: { id: req.params.id } });


        res.status(200).json({
            message: "ALL TEAM LIST",
            status: 200,
            data: TeamList
        })


    } catch (error) {
        console.log("stateInPeople:___", error);
        res.status(500).json({
            message: 'SOMETHING WENT WRONG',
            status: 500,
        })
    }
}

exports.insertTeamMember = async (req, res) => {
    try {

        const memberProfileData = await cloudinary.uploader.upload(req.file.path, { folder: "memberProfile" });
        console.log("filePaths:__", memberProfileData);

        const memberData = new memberSchema({
            teamid: req.body.teamid,
            memberprofile: memberProfileData.secure_url,
            name: req.body.name,
            performance: req.body.performance,
            countryname: req.body.countryname,
            countrycode: req.body.countrycode,
            strengths: req.body.strengths,
            available: req.body.available,
        })
        const data = await memberData.save();

        res.status(200).json({
            message: "MEMBER REGISTRATION SUCCESSFULLY",
            status: 200,
            // data: data
        })
        console.log("========{ Insert Member }========");

    } catch (error) {
        console.log("insertData-Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};

exports.uploadMemberCountryFlag = async (req, res) => {
    try {

        const memberFlagData = await cloudinary.uploader.upload(req.file.path, { folder: "memberProfile" });
        console.log("filePaths:__", memberFlagData);


        const uploadMembersCountrysFlag = await memberSchema.update(
            { countryflag: memberFlagData.secure_url },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        res.status(200).json({
            message: "MEMBER COUNTRY FLAG UPLOADED SUCCESSFULLY",
            status: 200,
        })
        console.log("========{ Insert Member Countryflag }========");

    } catch (error) {
        console.log("insertData-Error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
};

exports.updateMember = async (req, res) => {
    try {

        const { body: { teamid, name, performance, countryname, countrycode, strengths, available } } = req

        const memberAndCountryImageUploading = async file => {
            return new Promise(resolve => {
                cloudinary.uploader.upload(file, { folder: "memberProfile" }, (err, res) => {
                    if (err) return res.status(500).json({ message: "upload image error" })
                    resolve({
                        res: res.secure_url
                    })
                }
                )
            })
        }


        const updateMemberData = await memberSchema.findOne({ where: { id: req.params.id } });
        // console.log("updateMemberData:__", updateMemberData);

        if (updateMemberData == null) {

            res.status(404).json({
                message: "MEMBER DATA NOT FOUND",
                status: 404,
            })

        } else {

            const newPath = await memberAndCountryImageUploading(req.file.path);

            let values = {

                teamid: teamid,
                memberprofile: newPath.res,
                name: name,
                performance: performance,
                countryname: countryname,
                countrycode: countrycode,
                strengths: strengths,
                available: available,
            }

            const UpdateMemberData = await memberSchema.update(values, { where: { id: req.params.id } });

            if (UpdateMemberData == null) {

                res.status(500).json({
                    message: "SOMETHING WENT WRONG (inside query para.)",
                    status: 500,
                })

            } else {

                res.status(200).json({
                    message: "UPDATE DATA SUCCESSFULLY",
                    status: 200,
                    data: values,
                })

            }
        }

    } catch (error) {

        console.log("update MemberData-error::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.memberById = async (req, res) => {
    try {
        const TeamList = await memberSchema.findOne({ where: { id: req.params.id } });


        res.status(200).json({
            message: "ALL TEAM LIST",
            status: 200,
            data: TeamList
        })


    } catch (error) {
        console.log("stateInPeople:___", error);
        res.status(500).json({
            message: 'SOMETHING WENT WRONG',
            status: 500,
        })
    }
}

exports.deleteMember = async (req, res) => {
    try {

        const findMemberDetails = await memberSchema.findOne({ where: { id: req.params.id } });
        // console.log('findMemberDetails:__', findMemberDetails);

        if (findMemberDetails == null) {

            res.status(404).json({
                message: "MEMBER NOT FOUND",
                status: 404,
            })

        } else {
            // cloudinary.uploader.destroy(findTeamDetails.publicurlid);

            const deleteMemberDetails = await memberSchema.destroy({ where: { id: req.params.id } });
            // console.log('deleteMemberDetails:__', deleteMemberDetails);
            if (deleteMemberDetails.length == 0) {

                res.status(404).json({
                    message: "MEMBER NOT FOUND",
                    status: 404,
                })

            } else {

                res.status(200).json({
                    message: "MEMBER DELETED",
                    status: 200,
                })
            }

        }

    } catch (error) {
        console.log("deleteTeam:___", error);
        res.status(500).json({
            message: 'SOMETHING WENT WRONG ( deleteMember )',
            status: 500,
        })
    }
}

exports.memberListByTeamId = async (req, res) => {
    try {

        const findTeamDetails = await teamSchema.findOne({ where: { id: req.params.id } });
        // console.log('findTeamDetails:__', findTeamDetails);

        if (findTeamDetails == null) {

            res.status(404).json({
                message: "TEAM NOT FOUND",
                status: 404,
            })

        } else {

            const MembersDetails = await memberSchema.findAll(
                {
                    where: {
                        teamid: req.params.id,
                        available: "1"
                    }
                });
            // console.log('MembersDetails:__', MembersDetails);
            if (MembersDetails.length == 0) {

                res.status(404).json({
                    message: "TEAM MEMBERS NOT FOUND / MAY BE MEMBERS NOT AVAILABLE",
                    status: 404,
                })

            } else {

                res.status(200).json({
                    message: "TEAM MEMBER FOUND",
                    status: 200,
                    data: MembersDetails
                })
            }

        }

    } catch (error) {
        console.log("deleteTeam:___", error);
        res.status(500).json({
            message: 'SOMETHING WENT WRONG ( deleteTeam )',
            status: 500,
        })
    }
}
