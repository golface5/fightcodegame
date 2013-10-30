var caa, ra, ca, ex, ey, rx, ry, dist, deg;
var koef = 1;

var Robot = function(r)
{
};

Robot.prototype.onIdle = function(ev)
{
	var r = ev.robot;
	r.clone();
	r.rotateCannon(360);
};

Robot.prototype.onScannedRobot = function(ev)
{
	var r = ev.robot;
	var e = ev.scannedRobot;
	if (e.parentId == r.id || e.id == r.parentId)
	{
		return;
	};
	
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
		if (-ca+90 > 0)
		{
			r.rotateCannon(Math.round(-20 * koef));
		}
		else
		{
			r.rotateCannon(Math.round(20 * koef));
		}
		//r.rotateCannon(-20);
		if (dist > 60)
		{
			r.ahead(40);
			koef = 1;
		}
		else
		{
			r.ahead(20);
			koef = 1;
		}
	}
	else
	{
		r.rotateCannon(-ca+270);
		r.fire();
		if (-ca+270 > 0)
		{
			r.rotateCannon(Math.round(-20 * koef));
		}
		else
		{
			r.rotateCannon(Math.round(20 * koef));
		}
		//r.rotateCannon(-20);
		if (dist > 60)
		{
			r.back(40);
			koef = 1;
		}
		else
		{
			r.back(20);
			koef = 1;
		}
	}
};

Robot.prototype.onHitByBullet = function(ev)
{
	var r = ev.robot;
	r.disappear();
};

Robot.prototype.onWallCollision = function(ev)
{
	var r = ev.robot;
};

Robot.prototype.onRobotCollision = function(ev)
{
	var r = ev.robot;
};