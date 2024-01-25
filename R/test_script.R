# test_script.R

require(foreign)
require(ggplot2)
require(MASS)
#require(Hmisc)
require(reshape2)

x <- 1:10
y <- x^2
#plot(x, y, main = "Simple Plot", xlab = "X-axis", ylab = "Y-axis")

dat <- read.dta("https://stats.idre.ucla.edu/stat/data/ologit.dta")
head(dat)   
