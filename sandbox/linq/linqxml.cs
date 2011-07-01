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

        public static 
    }
}
