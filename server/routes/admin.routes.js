const router = require('express').Router();
const upload = require("../utilis/multer");


const {
    insertTeam,
    updateTeam,
    viewAllTeamList,
    deleteTeam,
    teamById,
    insertTeamMember,
    updateMember,
    memberById,
    deleteMember,
    memberListByTeamId,
    uploadMemberCountryFlag,


} = require("../controllers/admin.controller");

router.post('/team/insert', upload.single("image"), insertTeam);
router.put('/team/update/:id', upload.single("image"), updateTeam);
router.get('/team/viewall', viewAllTeamList);
router.delete('/team/delete/:id', deleteTeam);
router.get('/team/view/:id', teamById);
router.post('/member/insert', upload.single("image"), insertTeamMember);
router.post('/member/insert/countryflag/:id', upload.single("image"), uploadMemberCountryFlag);

router.put('/member/update/:id', upload.single("image"), updateMember);
router.get('/member/view/:id', memberById);
router.delete('/member/delete/:id', deleteMember);

router.get('/member/viewbyteam/:id', memberListByTeamId);




module.exports = router;