using System;
using System.Collections.Generic;
using System.Globalization;
using Xunit;
using SimMetrics.Net.Metric;
using SimMetrics.Net.Utilities;

namespace SimMetrics.Net.Tests.SimilarityClasses.QGram
{
    // [TestFixture]
    public sealed class QGramDistanceUnitTests
    {
        #region Test Data Setup
        struct TestRecord
        {
            public TestRecord(string firstName, string secondNamem, double scoreOne, double scoreTwo, double scoreThree,
                              double scoreFour)
            {
                NameOne = firstName;
                NameTwo = secondNamem;
                TrigramExtendedDistanceMatchLevel = scoreOne;
                TrigramDistanceMatchLevel = scoreTwo;
                BigramExtendedDistanceMatchLevel = scoreThree;
                BigramDistanceMatchLevel = scoreFour;
            }

            public override string ToString()
            {
                return
                    NameOne + " : " + NameTwo + " : " + TrigramExtendedDistanceMatchLevel + " : " + TrigramDistanceMatchLevel +
                    " : " + BigramExtendedDistanceMatchLevel + " : " + BigramDistanceMatchLevel;
            }

            public string NameOne { get; set; }

            public string NameTwo { get; set; }

            public double TrigramExtendedDistanceMatchLevel { get; set; }

            public double TrigramDistanceMatchLevel { get; set; }

            public double BigramExtendedDistanceMatchLevel { get; set; }

            public double BigramDistanceMatchLevel { get; set; }
        }

        readonly Settings _addressSettings = Settings.Default;
        readonly List<TestRecord> _testNames = new List<TestRecord>(26);

        void AddNames(string addChars)
        {
            if (addChars != null)
            {
                string[] letters = addChars.Split(',');
                var testName = new TestRecord(letters[0], letters[1], Convert.ToDouble(letters[12], CultureInfo.InvariantCulture), Convert.ToDouble(letters[7], CultureInfo.InvariantCulture), Convert.ToDouble(letters[8], CultureInfo.InvariantCulture), Convert.ToDouble(letters[9], CultureInfo.InvariantCulture));
                _testNames.Add(testName);
            }
        }

        void LoadData()
        {
            AddNames(_addressSettings.blockDistance1);
            AddNames(_addressSettings.blockDistance2);
            AddNames(_addressSettings.blockDistance3);
        }
        #endregion

        #region General Test
        [Fact]
        // [Category("TrigramExtendedDistance Test")]
        public void QGramDistance_ShortDescription()
        {
            AssertUtil.Equal("QGramsDistance", myTrigramExtendedDistance.ShortDescriptionString,
                            "Problem with QGramDistance test short description.");
        }
        #endregion

        #region TrigramExtendedDistance Tests
        [Fact]
        // [Category("TrigramExtendedDistance Test")]
        public void TrigramExtendedDistance_TestData()
        {
            foreach (TestRecord testRecord in _testNames)
            {
                AssertUtil.Equal(testRecord.TrigramExtendedDistanceMatchLevel.ToString("F3"),
                                myTrigramExtendedDistance.GetSimilarity(testRecord.NameOne, testRecord.NameTwo).ToString("F3"),
                                string.Format("{0} TrigramExtendedDistance {1} {2}{3}{4}", Environment.NewLine,
                                              Environment.NewLine, testRecord.NameOne, Environment.NewLine, testRecord.NameTwo));
            }
        }
        #endregion

        #region TrigramDistance Tests
        [Fact]
        // [Category("TrigramDistance Test")]
        public void TrigramDistance_TestData()
        {
            foreach (TestRecord testRecord in _testNames)
            {
                AssertUtil.Equal(testRecord.TrigramDistanceMatchLevel.ToString("F3"),
                                myTrigramDistance.GetSimilarity(testRecord.NameOne, testRecord.NameTwo).ToString("F3"),
                                string.Format("{0} TrigramDistance {1} {2}{3}{4}", Environment.NewLine, Environment.NewLine,
                                              testRecord.NameOne, Environment.NewLine, testRecord.NameTwo));
            }
        }
        #endregion

        #region BigramExtendedDistance Tests
        [Fact]
        // [Category("BigramExtendedDistance Test")]
        public void BigramExtendedDistance_TestData()
        {
            foreach (TestRecord testRecord in _testNames)
            {
                AssertUtil.Equal(testRecord.BigramExtendedDistanceMatchLevel.ToString("F3"),
                                myBigramExtendedDistance.GetSimilarity(testRecord.NameOne, testRecord.NameTwo).ToString("F3"),
                                string.Format("{0} BigramExtendedDistance {1} {2}{3}{4}", Environment.NewLine,
                                              Environment.NewLine, testRecord.NameOne, Environment.NewLine, testRecord.NameTwo));
            }
        }
        #endregion

        #region BigramDistance Tests
        [Fact]
        // [Category("BigramDistance Test")]
        public void BigramDistance_TestData()
        {
            foreach (TestRecord testRecord in _testNames)
            {
                AssertUtil.Equal(testRecord.BigramDistanceMatchLevel.ToString("F3"),
                                myBigramDistance.GetSimilarity(testRecord.NameOne, testRecord.NameTwo).ToString("F3"),
                                string.Format("{0} BigramDistance {1} {2}{3}{4}", Environment.NewLine, Environment.NewLine,
                                              testRecord.NameOne, Environment.NewLine, testRecord.NameTwo));
            }
        }
        #endregion

        QGramsDistance myTrigramExtendedDistance;
        QGramsDistance myTrigramDistance;
        QGramsDistance myBigramExtendedDistance;
        QGramsDistance myBigramDistance;

        // [SetUp]
        public QGramDistanceUnitTests()
        {
            LoadData();
            // default is TokeniserQGram3Extended
            myTrigramExtendedDistance = new QGramsDistance();
            myTrigramDistance = new QGramsDistance(new TokeniserQGram3());
            myBigramExtendedDistance = new QGramsDistance(new TokeniserQGram2Extended());
            myBigramDistance = new QGramsDistance(new TokeniserQGram2());
        }
    }
}