var Robot = function(r)
{
};

Robot.prototype.onIdle = function(ev)
{
	var r = ev.robot;
	r.clone();
	r.rotateCannon(360);
	r.ahead(150);
	r.turn(30);
	r.ahead(150);
};

Robot.prototype.onScannedRobot = function(ev)
{
	var r = ev.robot;
	if (ev.scannedRobot.parentId == r.id || ev.scannedRobot.id == r.parentId)
	{
		return;
	};
	r.rotateCannon(2);
	r.fire();
	r.turn(8);
	r.rotateCannon(-20);
	r.ahead(15);
};

Robot.prototype.onHitByBullet = function(ev)
{
	var r = ev.robot;
	r.disappear();
};

Robot.prototype.onWallCollision = function(ev)
{
	var r = ev.robot;
	r.back(50);
};

Robot.prototype.onRobotCollision = function(ev)
{
	var r = ev.robot;
	r.back(30);
};