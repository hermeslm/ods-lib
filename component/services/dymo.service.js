'use strict';

angular
    .module('ods-lib')
    .factory('DYMO', DYMO);

DYMO.$inject = ['XMLConfig', 'Base64', 'moment'];

function DYMO(XMLConfig, Base64, moment) {
    var service = {
        loadPrinters: loadPrinters,
        loadDYMOOrderTemplate: loadDYMOOrderTemplate,
        loadDYMOEnvOrderTemplate: loadDYMOEnvOrderTemplate,
        printPatientOrderLabel: printPatientOrderLabel,
        printEnvOrderLabel: printEnvOrderLabel,
        loadDefaultDYMOOrderTemplate: loadDefaultDYMOOrderTemplate,
        loadDefaultDYMOEnvOrderTemplate: loadDefaultDYMOEnvOrderTemplate,
        testPatientLabel: testPatientLabel,
        testEnvironmentalLabel: testEnvironmentalLabel
    };

    return service;

    var printersSelect = '';
    var orderTemplate;
    var envOrdertemplate;

    loadPrinters();
    function loadPrinters() {
        var printers = dymo.label.framework.getLabelWriterPrinters();
        if (printers.length == 0) {
            // alert("No DYMO printers are installed. Install DYMO printers.");
            return false;
        }

        for (var i = 0; i < printers.length; i++) {
            var printer = printers[i];

            var printerName = printer.name;
            printersSelect = printerName;
        }

        return true;
    }

    function loadDYMOOrderTemplate(xml) {
        orderTemplate = dymo.label.framework.openLabelXml(xml);
    }

    function loadDYMOEnvOrderTemplate(xml) {
        envOrdertemplate = dymo.label.framework.openLabelXml(xml);
    }

    function printPatientOrderLabel(data) {
        if (!orderTemplate) {
            loadDefaultDYMOOrderTemplate();
        }

        orderTemplate.setObjectText('barcode', data.barcode);
        orderTemplate.setObjectText('name', data.name);
        orderTemplate.setObjectText('dob', moment(data.dob).format("MM/DD/Y"));
        orderTemplate.setObjectText('collectedDate', moment(data.collectedDate).format("MM/DD/Y"));
        orderTemplate.setObjectText('tube', data.tube);

        orderTemplate.print(printersSelect);
    }

    function printEnvOrderLabel(data) {
        if (!envOrdertemplate) {
            loadDefaultDYMOEnvOrderTemplate();
        }

        envOrdertemplate.setObjectText('barcode', data.barcode);
        envOrdertemplate.setObjectText('name', data.machine);
        envOrdertemplate.setObjectText('collectedDate', moment(data.collectedDate).format("MM/DD/Y"));
        envOrdertemplate.setObjectText('tube', data.tube);

        envOrdertemplate.print(printersSelect);
    }

    function loadDefaultDYMOOrderTemplate() {
        XMLConfig.patient().$promise.then(function (data) {
            orderTemplate = dymo.label.framework.openLabelXml(Base64.decode(data.file.replace("77u/", "")));
        }, function () {
            orderTemplate = dymo.label.framework.openLabelXml('<?xml version="1.0" encoding="utf-8"?><DieCutLabel Version="8.0" Units="twips"><PaperOrientation>Landscape</PaperOrientation><Id>Address</Id><IsOutlined>false</IsOutlined><PaperName>30252 Address</PaperName><DrawCommands><RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" /></DrawCommands><ObjectInfo><BarcodeObject><Name>barcode</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>True</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><Text>1234567890</Text><Type>Code128Auto</Type><Size>Medium</Size><TextPosition>Bottom</TextPosition><TextFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><CheckSumFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><TextEmbedding>None</TextEmbedding><ECLevel>0</ECLevel><HorizontalAlignment>Center</HorizontalAlignment><QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" /></BarcodeObject><Bounds X="331" Y="150.600006103516" Width="2672" Height="750" /></ObjectInfo><ObjectInfo><TextObject><Name>name</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Jhon Doe</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1601" Y="953" Width="1940" Height="230" /></ObjectInfo><ObjectInfo><TextObject><Name>dob</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="751" Y="1178" Width="870" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>collectedDate</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="738.000000000001" Y="953" Width="870.000000000002" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>compendium</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">test te test</String><Attributes><Font Family="Tahoma" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1998" Y="1163" Width="2250" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">COL:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="953" Width="445.000000000001" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO_____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Test:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="1606" Y="1178" Width="435.000000000001" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO__2</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">DOB:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="1178" Width="584.999999999999" Height="270" /></ObjectInfo></DieCutLabel>');
        });
    }

    function loadDefaultDYMOEnvOrderTemplate() {
        XMLConfig.environmental().$promise.then(function (data) {
            envOrdertemplate = dymo.label.framework.openLabelXml(Base64.decode(data.file.replace("77u/", "")));
        }, function () {
            envOrdertemplate = dymo.label.framework.openLabelXml('<?xml version="1.0" encoding="utf-8"?><DieCutLabel Version="8.0" Units="twips"><PaperOrientation>Landscape</PaperOrientation><Id>Address</Id><IsOutlined>false</IsOutlined><PaperName>30252 Address</PaperName><DrawCommands><RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" /></DrawCommands><ObjectInfo><BarcodeObject><Name>barcode</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>True</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><Text>1234567890</Text><Type>Code128Auto</Type><Size>Medium</Size><TextPosition>Bottom</TextPosition><TextFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><CheckSumFont Family="Arial" Size="7.3125" Bold="False" Italic="False" Underline="False" Strikeout="False" /><TextEmbedding>None</TextEmbedding><ECLevel>0</ECLevel><HorizontalAlignment>Center</HorizontalAlignment><QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" /></BarcodeObject><Bounds X="331" Y="150.600006103516" Width="2672" Height="580" /></ObjectInfo><ObjectInfo><TextObject><Name>name</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">Jhon Doe</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="798" Width="1740" Height="220" /></ObjectInfo><ObjectInfo><TextObject><Name>collectedDate</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">01/01/2016</String><Attributes><Font Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="753.000000000001" Y="998" Width="1290" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>tube</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">test te test</String><Attributes><Font Family="Tahoma" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="332.999999999999" Y="1223" Width="2250" Height="270" /></ObjectInfo><ObjectInfo><TextObject><Name>TEXTO____1</Name><ForeColor Alpha="255" Red="0" Green="0" Blue="0" /><BackColor Alpha="0" Red="255" Green="255" Blue="255" /><LinkedObjectName /><Rotation>Rotation0</Rotation><IsMirrored>False</IsMirrored><IsVariable>False</IsVariable><GroupID>-1</GroupID><IsOutlined>False</IsOutlined><HorizontalAlignment>Left</HorizontalAlignment><VerticalAlignment>Top</VerticalAlignment><TextFitMode>ShrinkToFit</TextFitMode><UseFullFontHeight>True</UseFullFontHeight><Verticalized>False</Verticalized><StyledText><Element><String xml:space="preserve">COL:</String><Attributes><Font Family="Arial" Size="8" Bold="True" Italic="False" Underline="False" Strikeout="False" /><ForeColor Alpha="255" Red="0" Green="0" Blue="0" HueScale="100" /></Attributes></Element></StyledText></TextObject><Bounds X="331" Y="1013" Width="945" Height="270" /></ObjectInfo></DieCutLabel>');
        });
    }

    function testPatientLabel(xml) {
        var template;
        if (xml) {
            template = dymo.label.framework.openLabelXml(Base64.decode(xml.replace("77u/", "")));
        } else {
            template = orderTemplate;
        }

        template.setObjectText('barcode', 'P000001');
        template.setObjectText('name', 'Jhon Doe');
        template.setObjectText('dob', moment(new Date()).format("MM/DD/Y"));
        template.setObjectText('collectedDate', moment(new Date()).format("MM/DD/Y"));
        template.setObjectText('tube', 'Some tube name');

        template.print(printersSelect);
    }

    function testEnvironmentalLabel(xml) {
        var template;
        if (xml) {
            template = dymo.label.framework.openLabelXml(Base64.decode(xml.replace("77u/", "")));
        } else {
            template = envOrdertemplate;
        }

        template.setObjectText('barcode', 'E000001');
        template.setObjectText('name', 'TheMachinen');
        template.setObjectText('collectedDate', moment(new Date()).format("MM/DD/Y"));
        template.setObjectText('tube', 'Some tube name');

        template.print(printersSelect);
    }
};