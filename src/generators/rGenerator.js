export const rScript = pathObj => {
  return `require(jsonlite)\nnodes <- read.csv("${pathObj.populationPath.replace(
    /\\/g,
    '/'
  )}", header=T, as.is=T)\nlinks <- read.csv("${pathObj.networkPath.replace(
    /\\/g,
    '/'
  )}", header=T, as.is=T)\nlink=as.matrix(links)\nnode=as.matrix(nodes)\n#city=readline(prompt = "Enter city name : ")\n\nSIR <- function(city,I0, beta, alpha, t) {\n  a=which(node==city,arr.ind = T)\n  N=as.numeric(node[[a[1],2]])\n  S <- numeric(t)\n  I <- numeric(t)\n  S[1] <- N-I0\n  I[1] <- I0\n  IT=0\n\n   #p adad tasadofi\n  aa=which(link[,2]==city,arr.ind = T)\n\n\n\n    IT=sum(as.numeric(link[aa,3]))\n\n  IT\n\n  IIT=IT*0.001\n\n  IIT\n  IIT=round(IIT)\n  IIT\n\n  ab=which(link[,1]==city,arr.ind = T)\n  IF=sum(as.numeric(link[ab,3]))\n\n  IIF=round(IF*0.001)\n  IIF\n matIIF <- matrix(IIF, nrow=1, ncol=t)\n\n matIIT<- matrix(IIT,nrow = 1,ncol = t)\n\n\n  ST=(IT-IIT)\n\n  SF=(IF-IIF)\n  matST<-matrix(ST,nrow=1,ncol = t)\n  matSF<-matrix(SF,nrow=1,ncol=t)\n\n  ST\n  SF\n\n  for (i in 2:t) {\n     {\n\n    }\n    S[i] <- S[i-1] - beta*S[i-1]/N*I[i-1]+matST[i-1]-matSF[i-1]\n    I[i] <- I[i-1] + beta*S[i-1]/N*I[i-1] - alpha * I[i-1]+matIIT[i-1]-matIIF[i-1]\n    if (I[i] < 1 || S[i] < 1)\n      break\n  }\n  df <- data.frame(time=1:t, S=S, I=I, R=N-S-I)\n  #df <- df[S>1&I>1,]\n\n  #df$AR <- (df$I+df$R)/N\n  #nr <- nrow(df)\n  #rate <- df$I[2:nr]/df$I[1:(nr-1)]\n  #df$rate <- c(rate[1], rate)\n  return(df)\n}\n\n\n#read from json file\nresult <- fromJSON("${pathObj.inputPath.replace(
    /\\/g,
    '/'
  )}")\n\njson_data_frame <- as.data.frame(result)\nialpha=as.numeric(as.character(json_data_frame$healing_rate))\nibeta=as.numeric(as.character(json_data_frame$infection_rate))\niIO=as.numeric(as.character(json_data_frame$infected_population))\nicity=as.character(json_data_frame$city_name)\nit=as.numeric(as.character(json_data_frame$sim_time))\ndf <- SIR(icity,iIO,ibeta,ialpha,it)\n\n#make json file\n\nwrite_json(df, "${pathObj.outSIRPath.replace(
    /\\/g,
    '/'
  )}")\n\n###############Number of hospital need\n\ndi=data.frame(df$I)\nbed=df$I\nbed=round((0.003*df$I))\nbed=as.data.frame(bed)\ndb=merge(di,bed)\nwrite_json(db, "${pathObj.outBedPath.replace(
    /\\/g,
    '/'
  )}")`;
};
