var flag = 0;
var caa, ra, ca, ex, ey, rx, ry, dist, deg;

var Robot = function(r)
{
};

Robot.prototype.onIdle = function(ev)
{
	var r = ev.robot;
	//r.clone();
	if (flag == 0)
	{
		r.rotateCannon(360);
	}
};

Robot.prototype.onScannedRobot = function(ev)
{
	var r = ev.robot;
	var e = ev.scannedRobot;
	if (e.parentId == r.id || e.id == r.parentId)
	{
		flag = 0;
		return;
	};
	flag = 1;
	caa = r.cannonAbsoluteAngle;
	ra = r.angle;
	ca = r.cannonRelativeAngle;
	ex = e.position.x;
	ey = e.position.y;
	rx = r.position.x;
	ry = r.position.y;
	dist = Math.sqrt((ey-ry)*(ey-ry)+(ex-rx)*(ex-rx));
	//var deg = Math.round(Math.atan(ey/ex)*180/3.14);
	deg = Math.round(Math.atan((ey-ry)/(ex-rx))*180/3.14);
	r.stop();
	r.turn(90+deg-ra);
	if (rx < ex)
	{
		r.rotateCannon(-ca+90);
		r.fire();
		r.ahead(dist);
		if (-ca+90 > 0)
		{
			r.rotateCannon(360);
		}
		else
		{
			r.rotateCannon(-360);
		}
	}
	else
	{
		r.rotateCannon(-ca+270);
		r.fire();
		r.back(dist);
		if (-ca+270 > 0)
		{
			r.rotateCannon(360);
		}
		else
		{
			r.rotateCannon(-360);
		}
	}
};

Robot.prototype.onHitByBullet = function(ev)
{
	var r = ev.robot;
	r.disappear();
	//flag = 0;
};

Robot.prototype.onWallCollision = function(ev)
{
	var r = ev.robot;
	//r.back(30);
	//r.turn(90);
};

Robot.prototype.onRobotCollision = function(ev)
{
	var r = ev.robot;
};