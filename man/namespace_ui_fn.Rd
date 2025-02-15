% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/ui_fn_info.R
\name{namespace_ui_fn}
\alias{namespace_ui_fn}
\title{Namespace a ui function}
\usage{
namespace_ui_fn(ui_name)
}
\arguments{
\item{ui_name}{Namespaced (\code{pkg::fn}) or un-namespaced (\code{fn}) function name
of known ui functions}
}
\value{
Function name in namespaced format
}
\description{
Throws an error if the function is not in the list of known ui functions
}
\examples{
shinyuieditor:::namespace_ui_fn("gridlayout::grid_page")
shinyuieditor:::namespace_ui_fn("grid_page")

}
\keyword{internal}
