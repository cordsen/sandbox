using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Linq;


namespace sandbox.linq
{
    class linqxml
    {
        public static XElement XElem()
        {
            XElement xml = new XElement("contacts",
                                new XElement("contact",
                                    new XAttribute("contactId", "2"),
                                    new XElement("firstName", "foo"),
                                    new XElement("lastName", "bar")
                                ),
                                new XElement("contact",
                                    new XAttribute("contactId", "3"),
                                    new XElement("firstName", "erik"),
                                    new XElement("lastName", "cord")
                                )
                            );
            return xml;
        }

        public static void test()
        {
            XDocument runway = XDocument.Load(string.Format("{0}.xml", textBox3.Text));
            //XDocument xdoc = new XDocument(

            new XElement("wayPointsDirection", radioButton1.Text,
                new XElement("WayPoints",
                    new XElement("LatitudeDegrees", g[p] + (int)latmin / 60,
                         new XAttribute("Minutes", (int)latmin % 60),
                             new XElement("Seconds", (int)(((h[p] - w) % 60 - (int)(latmin % 60)) * 60)),
                                new XElement("LongitudeDegrees", i[p] + (int)longmin / 60,
                                    new XAttribute("Minutes", (int)longmin % 60),
                                      new XAttribute("seconds", (int)((longmin % 60 - (int)(longmin % 60)) * 60)),
                                         new XElement("IcaoLocator", textBox1.Text,
                                             new XAttribute("angle", Math.Abs((int)theta1)),
                                             new XElement("DistanceInNauticalMiles", Math.Sqrt(Math.Pow((A1 / u) * 60, 2) + Math.Pow((A2 / v) * 60, 2))
                                                 ))))));


            XElement ParentNode = runway.Root.Element("wayPointsDirection");
            XElement node = new XElement("WayPoints");
            ParentNode.Add(node);
            runway.Save(string.Format("{0}.xml", textBox3.Text));
        }
    }
}
