<div className="container py-8">
  <div className="flex flex-col space-y-8">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-amber-800">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Welcome,</span>
        <span className="font-medium">{user?.email}</span>
      </div>
    </div>

    {/* Stats */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-amber-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-muted-foreground">
            {stats.upcomingBookings} upcoming
          </p>
        </CardContent>
      </Card>
      <Card className="border-amber-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Services</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedServices}</div>
          <p className="text-xs text-muted-foreground">
            {stats.pendingServices} pending
          </p>
        </CardContent>
      </Card>
      <Card className="border-amber-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <IndianRupee className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalSpent}</div>
          <p className="text-xs text-muted-foreground">
            Last 30 days
          </p>
        </CardContent>
      </Card>
      <Card className="border-amber-100">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews Given</CardTitle>
          <Star className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.reviewsGiven}</div>
          <p className="text-xs text-muted-foreground">
            {stats.pendingReviews} pending
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Recent Bookings */}
    <div>
      <h2 className="text-xl font-semibold mb-4 text-amber-800">Recent Bookings</h2>
      <Card className="border-amber-100">
        <CardContent className="p-0">
          {recentBookings.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No bookings found
            </div>
          ) : (
            <div className="divide-y divide-amber-100">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-amber-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{booking.service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.provider.business_name}
                      </p>
                    </div>
                    <Badge
                      variant={
                        booking.status === 'completed'
                          ? 'default'
                          : booking.status === 'cancelled'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1 text-amber-500" />
                      <span className="font-medium">{booking.total_amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>

    {/* Quick Actions */}
    <div>
      <h2 className="text-xl font-semibold mb-4 text-amber-800">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-amber-100 hover:border-amber-200 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-amber-500" />
              Find Services
            </CardTitle>
            <CardDescription>
              Browse and book new services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to="/services">Browse Services</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-amber-100 hover:border-amber-200 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Leave Reviews
            </CardTitle>
            <CardDescription>
              Rate and review your service experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to="/dashboard">View Bookings</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-amber-100 hover:border-amber-200 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-amber-500" />
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your account preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link to="/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</div> 