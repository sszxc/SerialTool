// 来自在线计算器 https://www.osgeo.cn/app/s1893 的前端代码
// 方位角，距离，海拔在线计算器
// 按钮触发的是 Calculate 函数

function $(id) {
    return document.getElementById(id);
}
function ParseAngle(id, limit) {
    var angle = parseFloat($(id).value);
    if (isNaN(angle) || (angle < -limit) || (angle > limit)) {
        alert("请正确输入值.");
        $(id).focus();
        return null;
    } else {
        return angle;
    }
}
function ParseElevation(id) {
    var angle = parseFloat($(id).value);
    if (isNaN(angle)) {
        alert("无效的海拔值.");
        $(id).focus();
        return null;
    } else {
        return angle;
    }
}
function ParseLocation(prefix) {
    var lat = ParseAngle(prefix + '_lat', 90.0);
    var location = null;
    if (lat != null) {
        var lon = ParseAngle(prefix + '_lon', 180.0);
        if (lon != null) {
            var elv = ParseElevation(prefix + '_elv');
            if (elv != null) {
                location = { 'lat': lat, 'lon': lon, 'elv': elv };
            }
        }
    }
    return location;
}
function EarthRadiusInMeters(latitudeRadians) {
    // http://en.wikipedia.org/wiki/Earth_radius
    var a = 6378137.0; // equatorial radius in meters
    var b = 6356752.3; // polar radius in meters
    var cos = Math.cos(latitudeRadians);
    var sin = Math.sin(latitudeRadians);
    var t1 = a * a * cos;
    var t2 = b * b * sin;
    var t3 = a * cos;
    var t4 = b * sin;
    return Math.sqrt((t1 * t1 + t2 * t2) / (t3 * t3 + t4 * t4));
}
function LocationToPoint(c) {
    // Convert (lat, lon, elv) to (x, y, z).
    var lat = c.lat * Math.PI / 180.0;
    var lon = c.lon * Math.PI / 180.0;
    var radius = c.elv + EarthRadiusInMeters(lat);
    var cosLon = Math.cos(lon);
    var sinLon = Math.sin(lon);
    var cosLat = Math.cos(lat);
    var sinLat = Math.sin(lat);
    var x = cosLon * cosLat * radius;
    var y = sinLon * cosLat * radius;
    var z = sinLat * radius;
    return { 'x': x, 'y': y, 'z': z, 'radius': radius };
}
function Distance(ap, bp) {
    var dx = ap.x - bp.x;
    var dy = ap.y - bp.y;
    var dz = ap.z - bp.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function RotateGlobe(b, a, bradius, aradius) {
    // Get modified coordinates of 'b' by rotating the globe so that 'a' is at lat=0, lon=0.
    var br = { 'lat': b.lat, 'lon': (b.lon - a.lon), 'elv': b.elv };
    var brp = LocationToPoint(br);
    // scale all the coordinates based on the original, correct geoid radius...
    brp.x *= (bradius / brp.radius);
    brp.y *= (bradius / brp.radius);
    brp.z *= (bradius / brp.radius);
    brp.radius = bradius; // restore actual geoid-based radius calculation
    // Rotate brp cartesian coordinates around the z-axis by a.lon degrees,
    // then around the y-axis by a.lat degrees.
    // Though we are decreasing by a.lat degrees, as seen above the y-axis,
    // this is a positive (counterclockwise) rotation (if B's longitude is east of A's).
    // However, from this point of view the x-axis is pointing left.
    // So we will look the other way making the x-axis pointing right, the z-axis
    // pointing up, and the rotation treated as negative.
    var alat = -a.lat * Math.PI / 180.0;
    var acos = Math.cos(alat);
    var asin = Math.sin(alat);
    var bx = (brp.x * acos) - (brp.z * asin);
    var by = brp.y;
    var bz = (brp.x * asin) + (brp.z * acos);
    return { 'x': bx, 'y': by, 'z': bz };
}
function Calculate() {
    var a = ParseLocation('a');
    if (a != null) {
        var b = ParseLocation('b');
        if (b != null) {
            var ap = LocationToPoint(a);
            var bp = LocationToPoint(b);
            var distKm = 0.001 * Math.round(Distance(ap, bp));
            $('div_Distance').innerHTML = distKm + ' km';
            // Let's use a trick to calculate azimuth:
            // Rotate the globe so that point A looks like latitude 0, longitude 0.
            // We keep the actual radii calculated based on the oblate geoid,
            // but use angles based on subtraction.
            // Point A will be at x=radius, y=0, z=0.
            // Vector difference B-A will have dz = N/S component, dy = E/W component.
            var br = RotateGlobe(b, a, bp.radius, ap.radius);
            var theta = Math.atan2(br.z, br.y) * 180.0 / Math.PI;
            var azimuth = 90.0 - theta;
            if (azimuth < 0.0) {
                azimuth += 360.0;
            }
            if (azimuth > 360.0) {
                azimuth -= 360.0;
            }
            $('div_Azimuth').innerHTML = (Math.round(azimuth * 10) / 10) + '&deg;';
            // Calculate altitude, which is the angle above the horizon of B as seen from A.
            // Almost always, B will actually be below the horizon, so the altitude will be negative.
            var shadow = Math.sqrt((br.y * br.y) + (br.z * br.z));
            var altitude = Math.atan2(br.x - ap.radius, shadow) * 180.0 / Math.PI;
            $('div_Altitude').innerHTML = (Math.round(altitude * 100) / 100).toString().replace(/-/g, '&minus;') + '&deg;';
        }
    }
}
