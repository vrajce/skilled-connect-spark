<div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl mx-auto"
  >
    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">
      Welcome to SevaBee
    </h1>
    <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
      Connect with skilled service providers in your area
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/services">
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
          Browse Services
        </Button>
      </Link>
      <Link to="/providers">
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
          Find Providers
        </Button>
      </Link>
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full"
  >
    <Card className="border-amber-200 hover:border-amber-300 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-amber-500" />
          Find Services
        </CardTitle>
        <CardDescription>
          Browse through our wide range of professional services
        </CardDescription>
      </CardHeader>
    </Card>
    <Card className="border-amber-200 hover:border-amber-300 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-500" />
          Book Instantly
        </CardTitle>
        <CardDescription>
          Schedule appointments with just a few clicks
        </CardDescription>
      </CardHeader>
    </Card>
    <Card className="border-amber-200 hover:border-amber-300 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          Rate & Review
        </CardTitle>
        <CardDescription>
          Share your experience and help others make informed decisions
        </CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
</div> 